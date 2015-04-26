'use strict'

var TodoCollection = require('./todo-collection')

var todos = new TodoCollection()

var dataChannel = require('backbone.radio').channel('data')

var addTodo = function(title) {
  var trimmedTitle = title && title.trim()
  if (trimmedTitle) {
    todos.add({title: title})
  }
}

dataChannel.comply('todo:create', addTodo)
