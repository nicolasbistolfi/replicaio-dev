const HOST = process.env.HOST;

if (!HOST) {
  throw new Error('"HOST" not found in environment');
}

const CONFIG = {
  host : HOST,
  port : 80,
  protocol: 'https:',
  content_type: '(html|javascript|css)',
  actions: {
    content_type: {
      html_example: {
        matches: '(html-none)',
        regex_replaces: [
          {regex: 'https:\/\/replicajs\.com', value: HOST}
        ]
      }
    }
  }
};

exports.CONFIG = CONFIG;
