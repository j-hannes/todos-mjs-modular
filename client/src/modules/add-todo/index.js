'use strict'

// components
var TodoInputView = require('./views/todo-input-view')
var Module = require('../../common/module')

// channels
var layoutChannel = require('backbone.radio').channel('layout')


// ###########
// ### API ###
// ###########

module.exports = Module.extend({

  autostart: true,

  start: function() {
    this.todoInputView = new TodoInputView()
    layoutChannel.command('show:header', this.todoInputView)
  },

  onDestroy: function() {
    this.todoInputView && this.todoInputView.destroy()
  },
})
