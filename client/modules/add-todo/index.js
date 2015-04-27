'use strict'

// channels
var layoutChannel = require('backbone.radio').channel('layout')

// components
var Module = require('../../common/module')
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

var AddTodoModule = Module.extend({
  autostart: true,

  start: function() {
    var view = renderedTodoInputView()
    layoutChannel.command('show:header', view)
  },
})

// export as singleton
module.exports = new AddTodoModule()
