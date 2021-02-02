const replica = require('../lib/replica');

const replace = [{ regex: 'https:\/\/blog\.piio\.co', value: 'http://localhost:9002' }];
const config = {
  route: '*',
  host: 'blog.piio.co',
  port: 443,
  protocol: 'https:',
  content_type: '(css|html|javascript)',
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
  },
};
console.log(config)
const app = replica(config);

module.exports = app;
