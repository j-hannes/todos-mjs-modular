'use strict'

var Backbone = require('backbone')
var TodoModel = require('./todo-model')

var dataChannel = require('backbone.radio').channel('app')


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

  initialize: function() {
    this.listenTo(this, 'add', notifyItemAdded)
  },
})
