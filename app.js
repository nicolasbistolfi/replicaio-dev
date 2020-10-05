var replica = require('./lib/replica');

const HOST = process.env.HOST,
  TARGET_DOMAIN = process.env.TARGET_DOMAIN,
  TARGET_PORT = process.env.TARGET_PORT || 443,
  TARGET_PROTOCOL = process.env.TARGET_PROTOCOL || 'https:',
  TARGET_REGEX = process.env.TARGET_REGEX,
  CONTENT_TYPE_REGEX = process.env.CONTENT_TYPE_REGEX;

const replace = [{
  regex: TARGET_REGEX,
  value: HOST
}];
const app = replica([{
  route: '*',
  host: TARGET_DOMAIN,
  port: TARGET_PORT,
  protocol: TARGET_PROTOCOL,
  content_type: CONTENT_TYPE_REGEX,
  actions: {
    content_type: {
      css: {
        replace: replace,
        minify: {
          compatibility: '*'
        }
      },
      js: {
        replace: replace,
        minify: true
      },
      html: {
        replace: replace,
        htmlparser: {
          parser: 'jsdom',
          js: {
            defer: 'all',
            cloak: 'all'
          }
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          preserveLineBreaks: false,
          removeRedundantAttributes: true,
          useShortDoctype: true
        }
      }
    }
  }
}]);

module.exports = app;
