'use strict'

var ViewModule   = require('../../common/view-module')
var TodoListView = require('./views/todo-list-view')

module.exports = ViewModule.extend({
  name:      'todo-list',
  region:    'main',
  viewClass: TodoListView,
})
