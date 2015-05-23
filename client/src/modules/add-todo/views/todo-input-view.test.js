'use strict'

require('../../../../setup/test')
require('../../../../setup/dom')
require('../../../../setup/plugins')

// var Backbone = require('backbone')
var $ = require('jquery')
var Marionette = require('backbone.marionette')

// var AddTodoModule = require('./')
// var Module = require('../../common/module')
var TodoInputView = require('./todo-input-view')

// var appChannel = require('backbone.radio').channel('app')
// var layoutChannel = require('backbone.radio').channel('layout')
// var dataChannel = require('backbone.radio').channel('data')

var c = require('ramda').compose

function createTodoInputTemplate(params) {
  return $('<div id="todo-input-template">').html(params.content)
}

function insertIntoBody(content) {
  $('body').append(content)
}

function cleanBodyContent() {
  $('body').empty()
}

describe('TodoInputView :: Marionette.ItemView', function() {

  var view

  beforeEach(function() {
    view = new TodoInputView()
  })

  afterEach(function() {
    view.destroy()
    cleanBodyContent()
  })

  it('should be an ItemView', function() {
    view.should.be.an.instanceOf(Marionette.ItemView)
  })

  it('should use #todo-input-template', function() {
    c(insertIntoBody, createTodoInputTemplate) ({content: 'yuri the russian'})

    view.render()

    view.el.innerHTML.should.contain('yuri the russian')
  })

  // it('should be destroyed without a big explosion', function(done) {
  //   loadHtmlDocument({live: true}).then(function() {
  //     var view = new TodoInputView()
  //     view.destroy()
  //     done()
  //   })
  // })

  // it('should send input text to data channel', function(done) {
  //   var view = new TodoInputView()
  //   view.render()
  //   view.$('#new-todo').val('yuri42')

  //   dataChannel.comply('todos:add', function(title) {
  //     if (title === 'yuri42') {
  //       done()
  //     }
  //   })

  //   Backbone.$(view.el).submit()
  // })

  // it('should send input text to data channel', function() {
  //   var view = new TodoInputView()
  //   view.resetDomSelectors()
  //   Backbone.$(view.el).submit()
  // })
})
