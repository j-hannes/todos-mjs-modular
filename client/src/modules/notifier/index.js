'use strict'

// channels
var dataChannel = require('backbone.radio').channel('data')

// components
var Module = require('../../common/module')


// ###########
// ### API ###
// ###########

module.exports = Module.extend({

  name: 'notifier',

  autostart: true,

  logTodos: function(todo) {
    console.log(todo.toJSON())
  },

  start: function() {
    dataChannel.on('todo:created', this.logTodos)
  },

  onDestroy: function() {
    dataChannel.off('todo:created', this.logTodos)
  },
})
