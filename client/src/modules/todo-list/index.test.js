'use strict'

var sinon = require('sinon')
var App = require('../../app')
var Module = require('../../common/module')
var TodoListModule = require('./')
var TodoListView = require('./views/todo-list-view')

var layoutChannel = radio.channel('layout')

describe('TodoList :: Module', function() {

  var todoListModule
  var app

  before(function() {
    app = new App()
  })

  after(function() {
    app.destroy()
  })

  beforeEach(function() {
    todoListModule = new TodoListModule()
  })

  afterEach(function() {
    todoListModule.destroy()
  })

  it('should be a module', function() {
    todoListModule.should.be.instanceOf(Module)
  })

  it('should have a name', function() {
    todoListModule.should.have.property('name')
  })

  it('should have autostart set to true', function() {
    todoListModule.should.have.property('autostart')
    todoListModule.autostart.should.be.true
  })

  it('should send a show:content command with correct parameter on start',
     function(done) {
    function testTodoListModuleViewInstance(view) {
      view.should.be.an.instanceOf(TodoListView)
      layoutChannel.stopComplying('show:main', testTodoListModuleViewInstance)
      done()
    }

    layoutChannel.comply('show:main', testTodoListModuleViewInstance)

    todoListModule.start()
  })

  it('should create a todoListView member variable on start', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:main', fakeHandler)

    // invoke
    todoListModule.start()

    // check
    todoListModule.should.have.property('todoListView')

    // clean up
    layoutChannel.stopComplying('show:main', fakeHandler)
  })

  it('should destroy its view when destroyed', function() {
    // prepare
    var fakeHandler = function() {}
    layoutChannel.comply('show:main', fakeHandler)
    todoListModule.start()
    var spy = sinon.spy(todoListModule.todoListView, 'destroy')

    // invoke
    todoListModule.destroy()

    // check
    spy.should.have.been.called

    // clean up
    todoListModule = new TodoListModule()
    layoutChannel.stopComplying('show:main', fakeHandler)
  })

})
