var Application = require('./app')

describe('App :: Application', function() {
  'use strict'

  it('should be a Marionette.Application', function() {
    var app = new Application()
    app.should.be.instanceOf(Marionette.Application)
  })

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
