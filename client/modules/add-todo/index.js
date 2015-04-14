'use strict'

var Marionette = require('backbone.marionette')
var TodoInputView = require('./views/todo-input-view')

var appChannel = require('backbone.radio').channel('app')
var layoutChannel = require('backbone.radio').channel('layout')

var AddTodoModule = Marionette.Object.extend({

  initialize: function() {
    this.view = new TodoInputView()
    this.view.render()
  },

  start: function() {
    layoutChannel.command('show:header', this.view)
  },
})

appChannel.command('register:module', {
  name: 'add-todo',
  ModuleClass: AddTodoModule,
})

module.exports = AddTodoModule
