'use strict'

require('../../test-env')

var todoEntity = require('./')

describe('Todo :: Entity', function() {
  it('should contain no todos by default', function() {
    todoEntity.getTodos().length.should.be.equal(0)
  })

  it('should return an added todo which had a proper title', function() {
    var todoTitle = 'Kill Darth Vader'
    todoEntity.addTodo(todoTitle)

    var todos = todoEntity.getTodos()
    var addedTodo = todos[0]

    addedTodo.title.should.be.equal(todoTitle)
  })
})
