'use strict'

var ViewModule    = require('../../common/view-module')
var TodoInputView = require('./views/todo-input-view')

module.exports = ViewModule.extend({
  name:      'add-todo',
  region:    'header',
  viewClass: TodoInputView,
})
