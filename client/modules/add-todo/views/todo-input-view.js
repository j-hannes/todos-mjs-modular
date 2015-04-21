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

  // good or not?
  var todoTitle = $todoInputField &&
                  typeof $todoInputField.val === 'function' &&
                  $todoInputField.val() ||
                  ''

  appChannel.command('create:todo', todoTitle)
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
