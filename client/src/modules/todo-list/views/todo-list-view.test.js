'use strict'

var $ = require('jquery')
var Marionette = require('backbone.marionette')

var TodoListView = require('./todo-list-view')

var compose = require('ramda').compose

var createTodoListTemplate = function(params) {
  return $('<script>')
    .attr('type', 'text/html')
    .attr('id', 'todo-list-template')
    .html(params.content)
}

var insertIntoBody = function(content) {
  $('body').append(content)
}

var cleanBodyContent = function() {
  $('body').empty()
}

describe('TodoListView :: Marionette.CompositeView', function() {

  var todoListView

  before(function() {
    var content = '<div></div>'
    compose(insertIntoBody, createTodoListTemplate)({content: content})
  })

  beforeEach(function() {
    todoListView = new TodoListView()
  })

  afterEach(function() {
    todoListView.destroy()
  })

  after(function() {
    cleanBodyContent()
  })

  it('should be a CompositeView', function() {
    todoListView.should.be.instanceOf(Marionette.CompositeView)
  })

  it('should use #todo-list-template', function() {
    todoListView.render()
    todoListView.el.innerHTML.should.be.equal($('#todo-list-template').html())
  })

})
