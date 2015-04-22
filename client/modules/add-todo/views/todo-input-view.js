'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')


// ####################
// ### private area ###
// ####################

var $todoInputField

var getInputValue = function() {
  if ($todoInputField && typeof $todoInputField.val === 'function') {
    return $todoInputField.val()
  } else {
    return ''
  }
}

var handleFormSubmit = function(e) {
  e.preventDefault()
  var todoTitle = getInputValue()
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

  onDestroy: function() {
    appChannel.off('todo:created', emptyTodoInputField)
  },
})
