'use strict'

var Backbone = require('backbone')
var TodoModel = require('./todo-model')

var appChannel = require('backbone.radio').channel('app')

module.exports = Backbone.Collection.extend({
  model: TodoModel,

  initialize: function() {
    this.listenTo(this, 'add', this.notifyItemAdded)
  },

  notifyItemAdded: function(todo) {
    appChannel.trigger('todo:created', todo)
  },
})
