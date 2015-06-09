'use strict'

require('../../../setup/dom')
require('../../../setup/test')
require('../../../setup/plugins')

var sinon = require('sinon')

var AddTodoModule = require('./')
var Module = require('../../common/module')
var TodoInputView = require('./views/todo-input-view')

var layoutChannel = require('backbone.radio').channel('layout')

describe('AddTodo :: Module', function() {

  var addTodoModule

  beforeEach(function() {
    addTodoModule = new AddTodoModule()
  })

  afterEach(function() {
    addTodoModule.destroy()
  })

  it('should be a Module', function() {
    addTodoModule.should.be.an.instanceOf(Module)
  })

  it('should have a name', function() {
    addTodoModule.should.have.property('name')
  })

  it('should send a show:header command with a TodoInputView instance on start',
     function(done) {
    function testTodoInputViewInstance(view) {
      view.should.be.an.instanceOf(TodoInputView)
      layoutChannel.stopComplying('show:header', testTodoInputViewInstance)
      done()
    }

    layoutChannel.comply('show:header', testTodoInputViewInstance)

    addTodoModule.start()
  })

  it('should have autostart set to true', function() {
    addTodoModule.should.have.property('autostart')
    addTodoModule.autostart.should.be.true
  })

  it('should create a todoInputView member variable on start', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:header', fakeHandler)

    // invoke
    addTodoModule.start()

    // check
    addTodoModule.should.have.property('todoInputView')

    // clean up
    layoutChannel.stopComplying('show:header', fakeHandler)
  })

  it('should destroy its view when destroyed', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:header', fakeHandler)
    addTodoModule.start()
    var spy = sinon.spy(addTodoModule.todoInputView, 'destroy')

    // invoke
    addTodoModule.destroy()

    // check
    spy.should.have.been.called

    // clean up
    addTodoModule = new AddTodoModule()
    layoutChannel.stopComplying('show:header', fakeHandler)
  })
})
