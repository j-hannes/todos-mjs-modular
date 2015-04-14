'use strict'

var Marionette = require('backbone.marionette')

module.exports = Marionette.ItemView.extend({
  tagName: 'form',
  template: '#todo-input-template',

  events: {
    submit: 'handleFormSubmit',
  },

  handleFormSubmit: function(e) {
    e.preventDefault()
  },

  initialize: function() {
    this.$newTodo = this.$('#new-todo')
  },
})
