'use strict'

var sinon = require('sinon')
var Module = require('./module')
var ViewModule = require('./view-module')

var layoutChannel = radio.channel('layout')

describe('View', function() {

  var viewModule

  beforeEach(function() {
    var MyModule = ViewModule.extend({
      viewClass: Backbone.View,
      region: 'main',
    })
    viewModule = new MyModule()
  })

  afterEach(function() {
    viewModule.destroy()
  })

  it('should be a Module', function() {
    viewModule.should.be.an.instanceOf(Module)
  })

  it('should have autostart set to true', function() {
    viewModule.should.have.property('autostart')
    viewModule.autostart.should.be.true
  })

  it('should create a view member variable on start', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:' + viewModule.region, fakeHandler)

    // invoke
    viewModule.start()

    // check
    viewModule.should.have.property('view')

    // clean up
    layoutChannel.stopComplying('show:' + viewModule.region, fakeHandler)
  })

  it('should send a show:<region> command with a view instance on start',
     function(done) {
    function testViewInstance(view) {
      view.should.be.an.instanceOf(viewModule.viewClass)
      layoutChannel.stopComplying('show:' + viewModule.region, testViewInstance)
      done()
    }

    layoutChannel.comply('show:' + viewModule.region, testViewInstance)

    viewModule.start()
  })

  it('should remove its view if Backbone view when destroyed', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:' + viewModule.region, fakeHandler)
    viewModule.viewClass = Marionette.ItemView
    viewModule.start()
    var spy = sinon.spy(viewModule.view, 'destroy')

    // invoke
    viewModule.destroy()

    // check
    spy.should.have.been.called

    // clean up
    var MyModule = ViewModule.extend({
      viewClass: Backbone.View,
      region: 'main',
    })
    viewModule = new MyModule()
    layoutChannel.stopComplying('show:' + viewModule.region, fakeHandler)
  })

  it('should destroy its view if Marionette view when destroyed', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:' + viewModule.region, fakeHandler)
    viewModule.start()
    var spy = sinon.spy(viewModule.view, 'remove')

    // invoke
    viewModule.destroy()

    // check
    spy.should.have.been.called

    // clean up
    var MyModule = ViewModule.extend({
      viewClass: Backbone.View,
      region: 'main',
    })
    viewModule = new MyModule()
    layoutChannel.stopComplying('show:' + viewModule.region, fakeHandler)
  })

})
