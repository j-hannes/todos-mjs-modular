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
    var view = new TodoInputView()
    layoutChannel.command('show:header', view)
  },
})
