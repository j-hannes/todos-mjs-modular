'use strict'

// require('./test-env')

// var sinon = require('sinon')
// var Backbone = require('backbone')
// var appChannel = require('backbone.radio').channel('app')
// var jsdom = require('jsdom').jsdom

// we have to do this for some reason because Marionette doesn't seem to like
// the jsdom-mocha config loaded from test-env
// Backbone.$ = require('jquery')(jsdom().parentWindow)
// var app = require('./app')

// run tests
describe('App :: Application', function() {
  // it('should register command "module:register"', function() {
  //   appChannel._commands.should.have.property('module:register')
  // })

  // it('should start registered autostart modules on start', function() {
  //   var start = sinon.spy()

  //   var Module = function() {
  //     this.start = start
  //     this.autostart = true
  //   }
  //   var module = new Module()

  //   // execution
  //   appChannel.command('module:register', module)
  //   app.start()

  //   // test
  //   start.should.have.been.called
  // })

  // it('should not allow a module to register twice', function() {
  //   var Module = function() {}
  //   var module = new Module()

  //   appChannel.command('module:register', module)
  //   var registerTwice = function() {
  //     appChannel.command('module:register', module)
  //   }

  //   registerTwice.should.throw('Module already registered.')
  // })
})
