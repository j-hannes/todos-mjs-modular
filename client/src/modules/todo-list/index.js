'use strict'

var ViewModule   = require('../../common/module/view-module')
var TodoListView = require('./views/todo-list-view')

module.exports = ViewModule.extend({
  name:      'todo-list',
  region:    'main',
  viewClass: TodoListView,
})
