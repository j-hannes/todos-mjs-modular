'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')
var layoutChannel = require('backbone.radio').channel('layout')

// components
var TodoInputView = require('./views/todo-input-view')


// ####################
// ### private area ###
// ####################

var renderedTodoInputView = function() {
  var view = new TodoInputView()
  view.render()
  return view
}


// ###########
// ### API ###
// ###########

var AddTodoModule = Marionette.Object.extend({
  register: function(key) {
    appChannel.command('register:module', {
      name: key,
      ModuleClass: AddTodoModule,
    })
  },

  start: function() {
    var view = renderedTodoInputView()
    layoutChannel.command('show:header', view)
  },
})

// export as singleton
module.exports = new AddTodoModule()
