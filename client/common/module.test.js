'use strict'

// set up test environment
require('../test-env')

// import testing libraries
var chai = require('chai')

// configure assertion library
chai.should()

// import components
var Module = require('./module')

// import channels
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
