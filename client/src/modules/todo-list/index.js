'use strict'

var radio = require('backbone.radio')

// components
var Module = require('../../common/module')
var TodoListView = require('./views/todo-list-view')

// channels
var layoutChannel = radio.channel('layout')


// ###########
// ### API ###
// ###########

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
