'use strict'

var TodoCollection = require('./todo-collection')

var todos = new TodoCollection()

// var appChannel = require('backbone.radio').channel('app')

// ###########
// ### API ###
// ###########

module.exports = {
  addTodo: function(title) {
    var trimmedTitle = title && title.trim()
    if (trimmedTitle) {
      todos.add({title: title})
    }
  },

  getTodos: function() {
    return todos.toJSON()
  },
}
