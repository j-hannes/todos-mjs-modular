'use strict'

// set up test environment
require('./test-env')

// import testing libraries
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')

// configure assertion library
chai.should()
chai.use(sinonChai)

// import components
var app = require('./app')

// import channels
var appChannel = require('backbone.radio').channel('app')

// run tests
describe('app', function() {
  it('should register command "module:register"', function() {
    appChannel._commands.should.have.property('module:register')
  })

  it('should start registered autostart modules on start', function() {
    // set up
    var start = sinon.spy()

    var Module = function() {
      this.start = start
      this.autostart = true
    }
    var module = new Module()

    // execution
    appChannel.command('module:register', module)
    app.start()

    // test
    start.should.have.been.called
  })

  it('should not allow a module to register twice', function() {
    var Module = function() {}
    var module = new Module()

    appChannel.command('module:register', module)
    var registerTwice = function() {
      appChannel.command('module:register', module)
    }

    registerTwice.should.throw('Module already registered.')
  })
})
