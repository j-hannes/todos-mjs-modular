'use strict'

var Module = require('../../common/module')
var TodoListView = require('./views/todo-list-view')

var layoutChannel = radio.channel('layout')

module.exports = Module.extend({

  name: 'todo-list',

  autostart: true,

  start: function() {
    this.createView()
  },

  createView: function() {
    this.todoListView = new TodoListView()
    layoutChannel.command('show:main', this.todoListView)
  },

  assignData: function() {
  },

  onDestroy: function() {
    this.todoListView && this.todoListView.destroy()
  },

})
