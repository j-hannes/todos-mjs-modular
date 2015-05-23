'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
// var dataChannel = require('backbone.radio').channel('data')


// ####################
// ### private area ###
// ####################

// var $todoInputField

// var getInputValue = function() {
//   if ($todoInputField && typeof $todoInputField.val === 'function') {
//     return $todoInputField.val()
//   } else {
//     return ''
//   }
// }

// var handleFormSubmit = function(e) {
//   e.preventDefault()
//   var todoTitle = getInputValue()
//   dataChannel.command('todos:add', todoTitle)
// }

// var cacheDomSelectors = function(view) {
//   $todoInputField = view.$('#new-todo')
// }

// var emptyTodoInputField = function() {
//   $todoInputField.val('')
// }

// var registerRadioListeners = function() {
//   dataChannel.on('todo:created', emptyTodoInputField)
// }


// ###########
// ### API ###
// ###########

module.exports = Marionette.ItemView.extend({
  // tagName: 'form',
  template: '#todo-input-template',

  // events: {
  //   submit: handleFormSubmit,
  // },

  // initialize: function() {
  //   registerRadioListeners()
  // },

  // onRender: function() {
  //   cacheDomSelectors(this)
  // },

  // onDestroy: function() {
  //   dataChannel.off('todo:created', emptyTodoInputField)
  // },

  // resetDomSelectors: function() {
  //   $todoInputField = undefined
  // },
})
