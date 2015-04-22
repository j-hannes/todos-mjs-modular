'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')


// ####################
// ### private area ###
// ####################

var logTodos = function(todo) {
  console.log(todo.toJSON())
}


// ###########
// ### API ###
// ###########

var NotifierModule = Marionette.Object.extend({
  register: function(key) {
    appChannel.command('register:module', {
      name: key,
      ModuleClass: NotifierModule,
      options: {
        autostart: true,
      },
    })
  },

  start: function() {
    appChannel.on('todo:created', logTodos)
  },
})

// export as singleton
module.exports = new NotifierModule()
