[![Replica Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://replicajs.com/)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org).

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

```js
const replica = require('replica')
const app = replica()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 12.0 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install replica
```

Follow [our installing guide](http://replicajs.com/en/starter/installing.html)
for more information.

## Features

  * Replicate static or dynamics websites
  * Highly performance
  * Deliver your website even when your server is down
  * Executable for replicating applications quickly

## Docs & Community

  * [Website and Documentation](http://replicajs.com/) - [[website repo](https://github.com/replica/replicajs.com)]
  * [GitHub Organization](https://github.com/replica) for Official Middleware & Modules
  * Visit the [Wiki](https://github.com/replica/replicajs/wiki)

### Security Issues

If you discover a security vulnerability in Replica, please see [Security Policies and Procedures](Security.md).

## Quick Start

  The quickest way to get started with replica is to utilize the executable [`replica(1)`](https://github.com/replicajs/generator) to generate an application as shown below:

  Install the executable. The executable's major version will match Replica's:

```bash
$ npm install -g replica-generator@4
```

  Create the app:

```bash
$ replica /tmp/foo && cd /tmp/foo
```

  Install dependencies:

```bash
$ npm install
```

  Start the server:

```bash
$ npm start
```

  View the website at: http://localhost:3000

## Philosophy

  The Replica philosophy is

## Examples

  To view the examples, clone the Replica repo and install the dependencies:

```bash
$ git clone git://github.com/replicajs/replica.git --depth 1
$ cd replica
$ npm install
```

  Then run whichever example you want:

```bash
$ node examples/content-negotiation
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Contributing

[Contributing Guide](Contributing.md)

## People

The author of Replica is [Nico Bistolfi](https://github.com/nicolasbistolfi)

[List of all contributors](https://github.com/replicajs/replica/graphs/contributors)

## License

  [MIT](LICENSE)
