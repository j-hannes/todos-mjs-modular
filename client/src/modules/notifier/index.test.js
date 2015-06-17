'use strict'

var sinon = require('sinon')
var NotifierModule = require('./')
var Module = require('../../common/module/module')

var dataChannel = radio.channel('data')

describe('Notifier', function() {

  var notifierModule

  beforeEach(function() {
    notifierModule = new NotifierModule()
  })

  afterEach(function() {
    notifierModule.destroy()
  })

  it('should be a Module', function() {
    notifierModule.should.be.an.instanceOf(Module)
  })

  it('should have a name', function() {
    notifierModule.should.have.property('name')
  })

  it('should have autostart set to true', function() {
    notifierModule.should.have.property('autostart')
    notifierModule.autostart.should.be.true
  })

  it('should listen to "todos:created"', function() {
    // prepare
    var spy = sinon.spy(notifierModule, 'logTodos')
    var model = new Backbone.Model({father: 'Anakin'})
    notifierModule.start()
    var consolelog = console.log
    console.log = function() {}

    // invoke
    dataChannel.trigger('todo:created', model)

    // clean up
    console.log = consolelog

    // check
    spy.should.have.been.calledWith(model)
  })

  it('should stop listening to "todos:created" on destroy', function() {
    // prepare
    var spy = sinon.spy(notifierModule, 'logTodos')
    notifierModule.start()

    // invoke
    notifierModule.destroy()
    dataChannel.trigger('todo:created', new Backbone.Model())

    // check
    spy.should.not.have.been.called

    // clean up
    notifierModule = new NotifierModule()
  })

})
