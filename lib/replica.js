exports = module.exports = create;

const { CONFIG } = require('./config'),
  rproxy = require('./helpers/rproxy'),
  express = require('express'),
  httpProxy = require('http-proxy'),
  util = require('util'),
  debug = util.debuglog('replica');

function create(config_source) {
  console.log('CREATE REPLICA');
  var replica = express();
  var router = express.Router();

  router.use(function (req, res, next) {
    debug('router %s', req.url);
    debug(next);
    next();
  });

  router.get('*', function(req, res) {
    let config = {};
    for (var i = 0; i < config_source.length; i++) {
      // match config based on the route
      config = Object.assign(CONFIG, config_source[i]);
    }
    debug(config);
    debug('%s %s %s START', config.host, req.method, req.url);
    let proxy = httpProxy.createProxyServer({
      target: {
        protocol: config.protocol,
        host: config.host,
        port: config.port,
        secure: true
      },
      changeOrigin: true
    });

    proxy.on('proxyRes', (proxyRes, req, res) => {
      let rp = rproxy(config.actions);

      proxyRes.on('data', function(chunk) {
        debug('proxyRes.on data');
        rp.chunks.push(chunk);
      });

      proxy.on('end', function(req, res, proxyRes) {
        rp.handle(req, res, proxyRes);
        debug('%s %s END', req.method, req.url);
      });

    });

    let option = {
      selfHandleResponse: true
    };

    proxy.web(req, res, option);
  });

  router.post('*', function(req, res) {
    let proxy = httpProxy.createProxyServer({
      target: {
        protocol: config.protocol,
        host: config.host,
        port: config.port,
        secure: true
      },
      changeOrigin: true
    });

    proxy.web(req, res);
  });

  replica.use('*', router);

  return replica;
}
