'use strict'

var Module = require('../../common/module/module')

var dataChannel = radio.channel('data')

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
