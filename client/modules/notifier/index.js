'use strict'

// channels
var dataChannel = require('backbone.radio').channel('data')

// components
var Module = require('../../common/module')

// ####################
// ### private area ###
// ####################

var logTodos = function(todo) {
  console.log(todo.toJSON())
}


// ###########
// ### API ###
// ###########

var NotifierModule = Module.extend({
  autostart: true,

  initialize: function() {
    this.moduleClass = NotifierModule
  },

  start: function() {
    dataChannel.on('todo:created', logTodos)
  },
})

// export as singleton
module.exports = new NotifierModule()
