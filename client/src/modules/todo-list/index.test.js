'use strict'

var Module = require('../../common/module')
var TodoList = require('./')

describe('TodoList :: Module', function() {

  var todoList

  beforeEach(function() {
    todoList = new TodoList()
  })

  afterEach(function() {
    todoList.destroy()
  })

  it('should be a module', function() {
    todoList.should.be.instanceOf(Module)
  })

  it('should have autostart set to true', function() {
    todoList.should.have.property('autostart')
    todoList.autostart.should.be.true
  })

})
