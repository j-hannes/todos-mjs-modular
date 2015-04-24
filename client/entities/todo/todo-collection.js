'use strict'

var Backbone = require('backbone')
var TodoModel = require('./todo-model')

var appChannel = require('backbone.radio').channel('app')


// ####################
// ### private area ###
// ####################

//+ nodifyItemAdded :: TodoModel -> AppEvent (TodoModel)
var notifyItemAdded = function(todo) {
  appChannel.trigger('todo:created', todo)
}


// ###########
// ### API ###
// ###########

module.exports = Backbone.Collection.extend({
  model: TodoModel,

  initialize: function() {
    this.listenTo(this, 'add', notifyItemAdded)
  },
})
