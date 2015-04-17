'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')


// ####################
// ### private area ###
// ####################

var $todoInputField

var handleFormSubmit = function(e) {
  e.preventDefault()
  appChannel.command('create:todo', $todoInputField.val())
}

var cacheDomSelectors = function(view) {
  $todoInputField = view.$('#new-todo')
}

var emptyTodoInputField = function() {
  $todoInputField.val('')
}

var registerRadioListeners = function() {
  appChannel.on('todo:created', emptyTodoInputField)
}


// ###########
// ### API ###
// ###########

module.exports = Marionette.ItemView.extend({
  tagName: 'form',
  template: '#todo-input-template',

  events: {
    submit: handleFormSubmit,
  },

  initialize: function() {
    registerRadioListeners()
  },

  onRender: function() {
    cacheDomSelectors(this)
  },
})
