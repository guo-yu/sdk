var mocha = require('mocha')
var should = require('should')
var SDK = require('../dist/sdk')

var sdk = new SDK('http://baidu.com', {
  read: 'v1/endpoint'
}).init()
var fake = new SDK('http://127.0.0.1', {
  read: 'v1/endpoint'
}).init()

describe('SDK', function() {
  describe('#constructor()', function() {
    it('should return a correct SDK instance', function() {
      sdk.should.be.an.instanceOf(SDK)
      sdk.should.have.property('host', 'http://baidu.com')
      sdk.should.have.property('routes')
      sdk.should.have.property('rules', null)
    })
  })
  describe('#instance()', function() {
    it('should reject a fail promise', function(done) {
      fake.read().then().catch(function(err){
        done(err ? null : new Error('fail'))
      })
    })
    it('should resolve a promise', function(done) {
      this.timeout(6000)
      sdk.read().then(function(result){
        result.should.have.property('response')
        result.should.have.property('code')
        result.should.have.property('body')
        done()
      })
    })
  })
})
