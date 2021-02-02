exports = module.exports = create;

const rbuffer = require('./rbuffer'),
  ractions = require('./ractions'),
  headers = require('./headers'),
  util = require('util'),
  debug = util.debuglog('replica');

const APP_NAME = process.env.APP_NAME ? process.env.APP_NAME  : 'Replica',
  CONTENT_ENCODING = process.env.CONTENT_ENCODING ? process.env.CONTENT_ENCODING : 0,
  CONTENT_TYPE_REGEX = process.env.CONTENT_TYPE_REGEX ? process.env.CONTENT_TYPE_REGEX : '(css|html|javascript)',
  STATUS_ERROR = 500;

/**
 * Create a Replica Proxy.
 *
 * @return {Function}
 * @api public
 */

function create(config) {
  let rproxy = {};

  rproxy.chunks = [];

  rproxy.error = async function(status, body, res) {
    var encodedBody = await rbuffer.encode(body, rproxy.outEncoding);

    if (encodedBody.error) {
      console.log('Cannot send error due to an encoding issue');
    } else {
      res.status(STATUS_ERROR);
      res.write(encodedBody);
      res.end();
    }
  };

  var encodeBody = async function(res, body, req, proxyRes) {
    try {
      rproxy.outEncoding = 'none';
      debug('accept-encoding: %s', req.headers['accept-encoding']);
      if (CONTENT_ENCODING & req.headers['accept-encoding'] !== undefined) {
        if (req.headers['accept-encoding'].match(/br/i)) {
          rproxy.outEncoding = 'br';
        } else if (req.headers['accept-encoding'].match(/gzip/i)) {
          rproxy.outEncoding = 'gzip';
        }
      }

      if (rproxy.outEncoding.match(/(br|gzip)/i)) {
        debug('content-encoding: %s', rproxy.outEncoding);
        res.setHeader('content-encoding', rproxy.outEncoding);
        return await rbuffer.encode(ractions(config, proxyRes.headers, body), rproxy.outEncoding);
      } else {
        debug('NO ENCODING');
        return ractions(config, proxyRes.headers, body);
      }
    } catch (error) {
      debug(`Cannot encode body %s %s`, rproxy.outEncoding, error);
      return {
        error: `Cannot encode body ${error}`
      };
    }
  };

  rproxy.handle = async function(req, res, proxyRes) {
    let content_type = proxyRes.headers['content-type'];
    // let matches = content_type.match(/charset=([^;,\r\n]+)/i);
    // let charset = (matches && matches[1]) ? matches[1] : 'utf-8';

    debug('chunks %s', rproxy.chunks.length);
    let ct = new RegExp(CONTENT_TYPE_REGEX, 'i');
    if (ct.test(content_type)) {
      debug('%s', content_type);
      var body = Buffer.concat(rproxy.chunks).toString();
      if (proxyRes.headers['content-encoding'] !== undefined) {
        body = await rbuffer.decode(Buffer.concat(rproxy.chunks), proxyRes.headers['content-encoding']);
      }

      if (body.error) {
        debug('Body decode error: %s', body.error);
        rproxy.error(500, body.error, res);
      } else {
        var encodedBody = await encodeBody(res, body, req, proxyRes);

        if (encodedBody.error) {
          console.log('encodedBody.error');
        } else {
          res.setHeader('X-Powered-By', APP_NAME);
          if (proxyRes.headers['cache-control'] === undefined) {
            res.setHeader('cache-control', 'public, max-age=604800, stale-while-revalidate');
          } else {
            res.setHeader('cache-control', 'public, max-age=604800, stale-while-revalidate');
          }
          if (proxyRes.headers['expires'] === undefined) {
            res.setHeader('expires', new Date(Date.now() + 604800 * 1000).toUTCString()); // 7 days
          } else {
            res.setHeader('expires', new Date(Date.now() + 604800 * 1000).toUTCString()); // 7 days
          }
          // res.setHeader('content-length', encodedBody.length);
          res.writeHead(proxyRes.statusCode, headers.clean(proxyRes.headers, ['content-length', 'cache-control', 'expires']));
          res.write(encodedBody);
          res.end();
        }
      }

    } else {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.write(Buffer.concat(rproxy.chunks));
      res.end();
    }
    rproxy.chunks = [];
  };

  return rproxy;
}
