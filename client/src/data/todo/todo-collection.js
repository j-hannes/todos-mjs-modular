'use strict'

var Backbone = require('backbone')
var TodoModel = require('./todo-model')

var dataChannel = require('backbone.radio').channel('data')


// ####################
// ### private area ###
// ####################

//+ nodifyItemAdded :: TodoModel -> AppEvent (TodoModel)
var notifyItemAdded = function(todo) {
  dataChannel.trigger('todo:created', todo)
}


// ###########
// ### API ###
// ###########

module.exports = Backbone.Collection.extend({
  model: TodoModel,

  addTodo: function(title) {
    if (typeof title !== 'string') return
    var trimmedTitle = title && title.trim()
    if (!trimmedTitle) return
    this.add({title: title})
  },

  listTodos: function() {
    return this.toJSON()
  },

  initialize: function() {
    this.listenTo(this, 'add', notifyItemAdded)

    dataChannel.comply('todos:add', this.addTodo, this)
    dataChannel.reply('todos:list', this.listTodos, this)
  },

  destroy: function() {
    dataChannel.stopComplying(null, this.addTodo)
    dataChannel.stopReplying(null, this.listTodos)
  },
})
