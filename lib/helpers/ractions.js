const util = require('util'),
  debug = util.debuglog('replica'),
  htmlparser = require('./actions/htmlparser');

exports = module.exports = ractions;

/**
 *
 * @return {Function}
 * @api public
 */

function ractions(config, props, str) {
  return self.process(config, props, str);
};

/** Private functions **/

let self = {};

self.process = function(config, props, str) {
  let fn_keys = Object.keys(config);
  for (let i = 0; i < fn_keys.length; i++) {
    if (fn_keys[i] in self) {
      str = self[fn_keys[i]](config[fn_keys[i]], props, str);
    }
  }
  return str;
}

self.content_type = function(config, props, str) {
  return self.process(config, props, str);
};

self.html = function(config, props, str) {
  if ('content-type' in props && /(html)/i.test(props['content-type'])) {
    debug(config);
    str = self.process(config, props, str);
  }
  return str;
};

self.js = function(config, props, str) {
  if ('content-type' in props && /(javascript)/i.test(props['content-type'])) {
    debug(config);
    str = self.process(config, props, str);
  }
  return str;
};

self.css = function(config, props, str) {
  if ('content-type' in props && /(css)/i.test(props['content-type'])) {
    debug(config);
    str = self.process(config, props, str);
  }
  return str;
};

self.minify = function(config, props, str) {
  debug('self.minify');
  if ('content-type' in props && /(html)/i.test(props['content-type'])) {
    var minify = require('html-minifier').minify;
    return minify(str, config);
  }
  if ('content-type' in props && /(javascript)/i.test(props['content-type'])) {
    var uglify = require("uglify-js");
    var result = uglify.minify(str);
    return result.code;
  }
  if ('content-type' in props && /(css)/i.test(props['content-type'])) {
    var CleanCSS = require('clean-css');
    return new CleanCSS(config).minify(str).styles;
  }
  return str;
};

self.htmlparser = function(config, props, str) {
  return htmlparser(config, props, str);
};

self.replace = function(config, props, str) {
  for (let i = 0; i < config.length; i++) {
    if ('regex' in config[i] && 'value' in config[i]) {
      str = self.regex_pair(config[i], str);
    }
  }
  return str;
};

self.regex_pair = function(obj, str) {
  let flags = 'ig';
  if ('flags' in obj) {
    flags = obj.flags;
  }
  let r = new RegExp(obj.regex, flags);
  return str.replace(r, obj.value);
}
