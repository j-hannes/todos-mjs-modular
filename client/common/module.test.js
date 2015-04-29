'use strict'

require('../test-env')

var Module = require('./module')
var appChannel = require('backbone.radio').channel('app')

describe('Module', function() {
  before(function() {
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
