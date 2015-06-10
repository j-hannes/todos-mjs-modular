'use strict'

require('../../../../setup/test')
require('../../../../setup/dom')
require('../../../../setup/plugins')

var $ = require('jquery')
var Marionette = require('backbone.marionette')

var expect = require('chai').expect

var App = require('../../../app')
var TodoListView = require('./todo-list-view')
var TodoItemView = require('./todo-item-view')
var TodoCollection = require('../../../data/todo/todo-collection')

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
  var app

  before(function() {
    app = new App()
    var content = '<div></div>'
    compose(insertIntoBody, createTodoListTemplate)({content: content})
  })

  after(function() {
    cleanBodyContent()
    app.destroy()
  })

  beforeEach(function() {
    todoListView = new TodoListView()
  })

  afterEach(function() {
    todoListView.destroy()
  })

  it('should be a CompositeView', function() {
    todoListView.should.be.instanceOf(Marionette.CompositeView)
  })

  it('should use #todo-list-template', function() {
    todoListView.render()
    todoListView.el.innerHTML.should.be.equal($('#todo-list-template').html())
  })

  it('should have TodoItemView as childView', function() {
    todoListView.should.have.property('childView')
    todoListView.getChildView().should.be.equal(TodoItemView)
  })

  it('should have access to todo-collection', function() {
    todoListView.should.have.property('collection')
    expect(todoListView.collection).to.exist
    todoListView.collection.should.be.instanceOf(TodoCollection)
  })

  it('should have #todo-list as childViewContainer', function() {
    todoListView.should.have.property('childViewContainer')
    todoListView.childViewContainer.should.be.equal('#todo-list')
  })

})
