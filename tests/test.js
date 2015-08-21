import mocha from 'mocha'
import should from 'should'
import SDK from '../dist/sdk'

const methods = {
  read: 'v1/endpoint'
}

const sdk = new SDK('http://baidu.com', methods).init()
const fake = new SDK('http://127.0.0.1', methods).init()

describe('SDK', () => {
  describe('#constructor()', () => {
    it('should return a correct SDK instance', () => {
      sdk.should.be.an.instanceOf(SDK)
      sdk.should.have.property('host', 'http://baidu.com')
      sdk.should.have.property('routes')
      sdk.should.have.property('rules', null)
    })
  })

  describe('#instance()', () => {
    it('should reject a fail promise', done => {
      fake.read().then().catch(err => {
        done(err ? null : new Error('fail'))
      })
    })

    it('should resolve a promise', function(done) {
      this.timeout(6000)
      sdk.read().then(result => {
        result.should.have.property('response')
        result.should.have.property('code')
        result.should.have.property('body')
        done()
      })
    })
  })
})
