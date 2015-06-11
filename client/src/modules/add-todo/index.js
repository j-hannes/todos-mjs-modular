'use strict'

var TodoInputView = require('./views/todo-input-view')
var Module = require('../../common/module')

var layoutChannel = radio.channel('layout')

module.exports = Module.extend({

  name: 'add-todo',

  autostart: true,

  start: function() {
    this.todoInputView = new TodoInputView()
    layoutChannel.command('show:header', this.todoInputView)
  },

  onDestroy: function() {
    this.todoInputView && this.todoInputView.destroy()
  },
})
