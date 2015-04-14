'use strict'

var TodoInputViewModel = require('./todo-input-view-model')

var expect = require('chai').expect

describe('TodoInputViewModel', function() {
  describe('createTodoItem', function() {
    it('should return true if a nonempty string is passed', function() {
      var model = new TodoInputViewModel()
      var result = model.createTodoItem('buy some milk')
      expect(result).to.be.equal(true)
    })
  })
})
