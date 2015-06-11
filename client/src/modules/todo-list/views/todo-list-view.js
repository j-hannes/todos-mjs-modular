'use strict'

var TodoItemView = require('./todo-item-view')

var dataChannel = radio.channel('data')

module.exports = Marionette.CompositeView.extend({

  template: '#todo-list-template',

  childView: TodoItemView,

  childViewContainer: '#todo-list',

  initialize: function() {
    this.initializeCollection()
  },

  initializeCollection: function() {
    this.collection = dataChannel.request('todo-collection')
  },

})
