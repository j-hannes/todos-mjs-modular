'use strict'

var Module = require('./module')

var appChannel = radio.channel('app')

describe('Module :: Marionette.Object', function() {
  afterEach(function() {
    appChannel.stopComplying()
  })

  it('should register itself correctly', function(done) {
    var module = new Module()

    appChannel.comply('module:register', function() {
      module.should.be.equal(module)
      done()
    })

    module.register()
  })
})
