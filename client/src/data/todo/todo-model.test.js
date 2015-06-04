'use strict'

require('../../../setup/test')

var Backbone = require('backbone')

var TodoModel = require('./todo-model')

describe('TodoModel :: Model', function() {

  var model

  beforeEach(function() {
    model = new TodoModel()
  })

  afterEach(function() {
    model.destroy()
  })

  it('should be a Backbone Model', function() {
    model.should.be.an.instanceOf(Backbone.Model)
  })

  it('should have completed:false as default value', function() {
    model.get('completed').should.be.false
  })

  it('should pass validation for nonempty title', function() {
    model.set('title', 'abc')
    model.isValid().should.be.true
  })

  it('should fail validation for empty title', function() {
    model.isValid().should.be.false
    model.set('title', '')
    model.isValid().should.be.false
    model.set('title', ' ')
    model.isValid().should.be.false
    model.set('title', ' \n')
    model.isValid().should.be.false
    model.set('title', '\t ')
    model.isValid().should.be.false
  })

})
