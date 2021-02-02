[![Replica Logo](https://via.placeholder.com/350x150)](http://replicajs.com/)

Accelerate, route, mutate & securely deliver every request with [node](http://nodejs.org).

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

```js
const replica = require('replica');
const app = replica({
    host : 'google.com',
    port : 443,
    protocol: 'https:'
});

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
  * Improve caching and assets delivery
  * Increase service availability
  * Use as a modern facade for legacy servers

## Docs & Community

  * [Website and Documentation](http://replicajs.com/) - [[website repo](https://github.com/replicaio/replicaio)]
  * [GitHub Organization](https://github.com/replicaio) for Official Middleware & Modules
  * Visit the [Wiki](https://github.com/replicaio/replicaio/wiki)

### Security Issues

If you discover a security vulnerability in Replica, please see [Security Policies and Procedures](Security.md).

## Quick Start


## Philosophy

  The Replica philosophy is

## Examples


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

[List of all contributors](https://github.com/replicaio/replicaio/graphs/contributors)

## License

  [MIT](LICENSE)
