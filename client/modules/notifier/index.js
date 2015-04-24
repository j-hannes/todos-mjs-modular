'use strict'

// channels
var appChannel = require('backbone.radio').channel('app')

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
  initialize: function() {
    this.moduleClass = NotifierModule
  },

  start: function() {
    appChannel.on('todo:created', logTodos)
  },
})

// export as singleton
module.exports = new NotifierModule()
