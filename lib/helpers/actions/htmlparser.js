const util = require('util'),
  debug = util.debuglog('replica');

exports = module.exports = htmlparser;

// const VALID_URL = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/;
/**
 *
 * @return {Function}
 * @api public
 */

function htmlparser(config, props, str) {
  return self.process(config, props, str);
};

/** Private functions **/

var self = {};
let dom = null;
let parser_type = null;
let parser = null;

self.jsdom = {};
self.cheerio = {};

self.process = function(config, props, str) {
  try {
    if ('content-type' in props && /(html)/i.test(props['content-type']) &&
      self.load_parser(config, str)) {
      let fn_keys = Object.keys(config);
      for (let i = 0; i < fn_keys.length; i++) {
        if (fn_keys[i] in self[parser_type]) {
          self[parser_type][fn_keys[i]](config[fn_keys[i]], props);
        }
      }
      return self[parser_type].html();
    } else {
      debug('Can\'t parse file.');
      return str;
    }
  } catch (error) {
    debug('Can\'t html parse file');
    debug(error);
    return str;
  }
};

self.load_parser = function(config, str) {
  parser_type = config.parser;
  switch (parser_type) {
    case 'cheerio':
      parser = require(parser_type);
      dom = parser.load(str, {
        xml: {
          normalizeWhitespace: false,
          decodeEntities: false
        }
      });
      break;
    case 'jsdom':
      parser = require(parser_type);
      var {
        JSDOM
      } = parser;
      dom = new JSDOM(str);
      break;
    default:
      debug('Incompatible parser');
      return false;
      break;
  }
  return true;
};

self.jsdom.html = function() {
  return dom.serialize();
};

self.jsdom.resources = function (config, props) {
  let i = config.length - 1;
  while (i >= 0) {
    let elem = dom.window.document.createElement(config[i].tag);
    let elem_attributes = Object.keys(config[i].attributes);

    for (let attr_index = 0; attr_index < elem_attributes.length; attr_index++) {
      elem.setAttribute(elem_attributes[attr_index], config[i].attributes[elem_attributes[attr_index]]);
    }

    dom.window.document.head[config[i].insert](elem);
    i--;
  }
};

self.jsdom.mutate = function (config, props) {
  dom = config.callback(dom, config, props);
}

self.jsdom.js = function(config, props) {
  debug(config);

  let scripts = dom.window.document.querySelectorAll("script");
  let i = 0;
  while (i < scripts.length) {
    let src = scripts[i].attributes['src'];
    let async = scripts[i].attributes['async'];
    let defer = scripts[i].attributes['defer'];
    if (src !== undefined) {
      if (!(async !== undefined || defer !== undefined)) {
        if (/(jquery\.js|jquery\.min)/.test(src.value) === false) {
          dom.window.document.querySelectorAll("script")[i].removeAttribute('async');
          dom.window.document.querySelectorAll("script")[i].setAttribute('defer', true);
        }
      }
    }
    i++;
  }
};
