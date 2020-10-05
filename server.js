const dotenv = require('dotenv'),
  spdy = require('spdy'),
  fs = require('fs');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const app = require('./app');


const PORT = process.env.PORT || 5500;

let options = {
  key: fs.readFileSync(__dirname + '/certs/server.key'),
  cert: fs.readFileSync(__dirname + '/certs/server.crt')
};

spdy
  .createServer(options, app)
  .listen(PORT, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + PORT + '.')
    }
  })
