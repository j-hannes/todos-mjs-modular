'use strict'

var TodoListModule = require('./')
var TodoListView   = require('./views/todo-list-view')
var ViewModule     = require('../../common/module/view-module')

describe('TodoList', function() {

  var todoListModule

  beforeEach(function() {
    todoListModule = new TodoListModule()
  })

  afterEach(function() {
    todoListModule.destroy()
  })

  it('should be a ViewModule', function() {
    todoListModule.should.be.an.instanceOf(ViewModule)
  })

  it('should have name "todo-list"', function() {
    todoListModule.should.have.property('name')
    todoListModule.name.should.be.equal('todo-list')
  })

  it('should have viewClass TodoListView', function() {
    todoListModule.should.have.property('viewClass')
    todoListModule.viewClass.should.be.equal(TodoListView)
  })

  it('should have region "main"', function() {
    todoListModule.should.have.property('region')
    todoListModule.region.should.be.equal('main')
  })

})
