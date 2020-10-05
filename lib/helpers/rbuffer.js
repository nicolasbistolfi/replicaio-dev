const rbuffer = exports,
  zlib = require('zlib'),
  util = require('util'),
  debug = util.debuglog('replica');

const gunzip = util.promisify(zlib.gunzip);
const gzip = util.promisify(zlib.gzip);
const deflate = util.promisify(zlib.deflate);
const dBrotli = util.promisify(zlib.brotliDecompress); /* check node version v12.18.0 */
const aBrotli = util.promisify(zlib.brotliCompress);


rbuffer.decode = async function(buffer, encoding) {
  try {
    debug('Decoding with ' + encoding);
    var bodyBuffer;
    switch (encoding) {
      case 'gzip':
        bodyBuffer = await gunzip(Buffer.concat([buffer]));
        break;
      case 'br':
        bodyBuffer = await dBrotli(Buffer.concat([buffer]));
        break;
      default:
        console.log('Encoding not supported '.res.getHeader('content-encoding'));
        break;
    }
    if (bodyBuffer !== undefined) {
      return bodyBuffer.toString();
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(`Cannot decode buffer ${error}`);
    return {
      error: `Cannot decode buffer ${error}`
    };
  }
};

rbuffer.encode = async function(buffer, encoding) {
  try {
    switch (encoding) {
      case 'deflate':
        return await deflate(buffer);
        break;
      case 'gzip':
        return await gzip(buffer);
        break;
      case 'br':
        return await aBrotli(buffer);
        break;
      case 'none':
        return buffer;
        break;
      default:
        console.log('Encoding not supported '.res.getHeader('content-encoding'));
        break;
    }
  } catch (error) {
    console.error(`Cannot deflate buffer ${error}`);
    return {
      error: `Cannot deflate buffer ${error}`
    };
  }
};
