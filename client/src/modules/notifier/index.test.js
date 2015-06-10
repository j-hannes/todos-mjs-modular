'use strict'

require('../../../setup/dom')
require('../../../setup/test')
require('../../../setup/plugins')

var NotifierModule = require('./')
var Module = require('../../common/module')

var Backbone = require('backbone')
var sinon = require('sinon')
var dataChannel = require('backbone.radio').channel('data')

describe('Notifier :: Module', function() {

  var notifierModule

  var consolelog

  beforeEach(function() {
    notifierModule = new NotifierModule()

    // replace console.log with dummy to suppress output
    consolelog = console.log
    console.log = function() {}
  })

  afterEach(function() {
    notifierModule.destroy()
    console.log = consolelog
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

    // invoke
    dataChannel.trigger('todo:created', model)

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
