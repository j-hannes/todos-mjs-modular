'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')
var layoutChannel = require('backbone.radio').channel('layout')

// components
var TodoInputView = require('./views/todo-input-view')

// private functions
var renderedTodoInputView = function() {
  var view = new TodoInputView()
  view.render()
  return view
}

// API (exposed functions)
var AddTodoModule = Marionette.Object.extend({

  initialize: function() {
    this.view = renderedTodoInputView()
  },

  start: function() {
    layoutChannel.command('show:header', this.view)
  },
})

// register module at application
appChannel.command('register:module', {
  name: 'add-todo',
  ModuleClass: AddTodoModule,
})

module.exports = AddTodoModule
