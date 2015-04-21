'use strict'

// set up
require('./test-env')

// libraries
var sinon = require('sinon')
require('chai').should()

// app components
var Application = require('./app')

// channels
var appChannel = require('backbone.radio').channel('app')

// stub module class
var Module = function() {}
Module.prototype.start = function() {}


describe('Application', function() {
  before(function() {
    appChannel.stopComplying('')
  })

  it('should start a registered autostart module', function() {
    // set up
    var module = new Module()
    var app = new Application()

    // sinon spy
    var start = sinon.spy(module, 'start')

    // execute test
    appChannel.command('register:module', {
      ModuleClass: Module,
      options: {
        autostart: true,
      },
    })

    app.start()

    // verify result
    start.should.have.been.called
  })
})
