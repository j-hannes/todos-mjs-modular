'use strict'

var AddTodoModule = require('./')
var ViewModule    = require('../../common/view-module')
var TodoInputView = require('./views/todo-input-view')

describe('AddTodo :: Module', function() {

  var addTodoModule

  beforeEach(function() {
    addTodoModule = new AddTodoModule()
  })

  afterEach(function() {
    addTodoModule.destroy()
  })

  it('should be a ViewModule', function() {
    addTodoModule.should.be.an.instanceOf(ViewModule)
  })

  it('should have name "add-todo"', function() {
    addTodoModule.should.have.property('name')
    addTodoModule.name.should.be.equal('add-todo')
  })

  it('should have viewClass TodoInputView', function() {
    addTodoModule.should.have.property('viewClass')
    addTodoModule.viewClass.should.be.equal(TodoInputView)
  })

  it('should have region "header"', function() {
    addTodoModule.should.have.property('region')
    addTodoModule.region.should.be.equal('header')
  })
})
