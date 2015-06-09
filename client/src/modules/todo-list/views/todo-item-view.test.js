'use strict'

var $ = require('jquery')
var Marionette = require('backbone.marionette')

var TodoItemView = require('./todo-item-view')

var compose = require('ramda').compose

var createTodoItemTemplate = function(params) {
  return $('<script>')
    .attr('type', 'text/html')
    .attr('id', 'todo-item-template')
    .html(params.content)
}

var insertIntoBody = function(content) {
  $('body').append(content)
}

var cleanBodyContent = function() {
  $('body').empty()
}

describe('TodoItemView :: Marionette.ItemView', function() {

  var todoItemView

  before(function() {
    var content = '<div></div>'
    compose(insertIntoBody, createTodoItemTemplate)({content: content})
  })

  after(function() {
    cleanBodyContent()
  })

  beforeEach(function() {
    todoItemView = new TodoItemView()
  })

  afterEach(function() {
    todoItemView.destroy()
  })

  it('should be a ItemView', function() {
    todoItemView.should.be.instanceOf(Marionette.ItemView)
  })

  it('should use #todo-item-template', function() {
    todoItemView.render()
    todoItemView.el.innerHTML.should.be.equal($('#todo-item-template').html())
  })

  it('should have a li tagname', function() {
    todoItemView.tagName.should.be.equal('li')
  })

})
