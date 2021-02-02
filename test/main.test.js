const chai = require('chai');
const chai_http = require('chai-http');

const replica_app = require('../test/app');
const express = require('express');

const HOST = process.env.HOST;
const T_PORT = 9001;
const R_PORT = 9002;

if (!HOST) {
  throw new Error('"HOST" not found in environment');
} else {
  console.log("HOST=" + HOST);
}

chai.use(chai_http);
chai.should();
// replica.listen(R_PORT);

const app = express();

app.get('/', (req, res) => {
  res.send('🐣');
});
// app.listen(T_PORT);

describe("Replica", () => {
  describe("GET / ", () => {
    // beforeEach(() => {
    //   app.listen(T_PORT);
    // });
    // afterEach(() => {
    //   app.close();
    // });
    // Test to get index
    it("Should get index", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          done();
        });
      chai.request(replica_app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          done();
        });
    });
  });
});

// var assert = require('assert');
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
