'use strict'

var Backbone = require('backbone')

var TodoModel = require('./todo-model')

describe('TodoModel :: Model', function() {

  it('should be a Backbone Model', function() {
    var model = new TodoModel()
    model.should.be.an.instanceOf(Backbone.Model)
  })

  it('should have completed:false as default value', function() {
    var model = new TodoModel()
    model.get('completed').should.be.false
  })

})
