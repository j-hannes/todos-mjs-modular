'use strict'

var dataChannel = radio.channel('data')

var $todoInputField

var getInputValue = function() {
  return $todoInputField.val()
}

var handleFormSubmit = function(e) {
  e.preventDefault()

  var todoTitle = getInputValue()
  dataChannel.command('todos:add', todoTitle)
}

var cacheDomSelectors = function(view) {
  $todoInputField = view.$('#new-todo')
}

var emptyTodoInputField = function() {
  $todoInputField.val('')
}

var registerRadioListeners = function() {
  dataChannel.on('todo:created', emptyTodoInputField)
}

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
    dataChannel.off('todo:created', emptyTodoInputField)
  },
})
