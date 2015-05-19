require('../setup/test')
require('../setup/dom')
require('../setup/plugins')

var Marionette = require('backbone.marionette')

var Application = require('./app')
var AppLayoutView = require('./views/app-layout-view')

var appChannel = require('backbone.radio').channel('app')

describe('App :: Application', function() {
  'use strict'

  var app

  beforeEach(function() {
    app = new Application()
  })

  afterEach(function() {
    app.destroy()
  })

  it('should be a Marionette.Application', function() {
    app.should.be.instanceOf(Marionette.Application)
  })

  it('should have AppLayoutView as layoutView', function() {
    app.layoutView.should.be.instanceOf(AppLayoutView)
  })

  it('should register a module via appChannel "module:register"', function() {
    // build
    var module = {name: 'Yuri\'s module'}

    // operate
    appChannel.command('module:register', module)

    // check
    app.getModule('Yuri\'s module').should.be.equal(module)
  })

  it('should not allow a module to register twice', function() {
    // build
    var module = {name: 'Rambo\'s module'}
    appChannel.command('module:register', module)

    // operate
    var registerTwice = function() {
      appChannel.command('module:register', module)
    }

    // check
    registerTwice.should.throw('Module already registered.')
  })

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

  //   var Module = function() {}
  //   var module = new Module()

  //   appChannel.command('module:register', module)
  //   var registerTwice = function() {
  //     appChannel.command('module:register', module)
  //   }

  //   registerTwice.should.throw('Module already registered.')
  // })
})
