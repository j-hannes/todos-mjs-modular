'use strict'

require('../../../../setup/test')
require('../../../../setup/dom')
require('../../../../setup/plugins')

var $ = require('jquery')
var Marionette = require('backbone.marionette')

var TodoInputView = require('./todo-input-view')

var dataChannel = require('backbone.radio').channel('data')

var compose = require('ramda').compose

var createTodoInputTemplate = function(params) {
  return $('<script>')
    .attr('type', 'text/html')
    .attr('id', 'todo-input-template')
    .html(params.content)
}

var insertIntoBody = function(content) {
  $('body').append(content)
}

var cleanBodyContent = function() {
  $('body').empty()
}

describe('TodoInputView :: Marionette.ItemView', function() {

  var view

  before(function() {
    var content = '<input id="new-todo" type="text">'
    compose(insertIntoBody, createTodoInputTemplate)({content: content})
  })

  after(cleanBodyContent)

  beforeEach(function() {
    view = new TodoInputView()
  })

  afterEach(function() {
    view.destroy()
  })

  it('should be an ItemView', function() {
    view.should.be.an.instanceOf(Marionette.ItemView)
  })

  it('should use #todo-input-template', function() {
    view.render()
    view.el.innerHTML.should.be.equal($('#todo-input-template').html())
  })

  it('should send input text to data channel', function(done) {
    view.render()
    view.$('#new-todo').val('yuri42')

    var test = function(title) {
      title.should.be.equal('yuri42')
      done()
      dataChannel.stopComplying('todos:add', test)
    }

    dataChannel.comply('todos:add', test)

    view.$el.submit()
  })

  it('should empty input field on dataChannel event todo:created', function() {
    view.render()
    view.$('#new-todo').val('something')

    dataChannel.trigger('todo:created')

    view.$('#new-todo').val().should.be.equal('')
  })
})
