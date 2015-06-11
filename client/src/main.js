'use strict'

require('../setup/plugins')
var Application = require('./app')

var loadModule = function(Module) {
  var module = new Module()
  module.register()
}

var app = window.app = new Application()

loadModule(require('./modules/add-todo'))
loadModule(require('./modules/todo-list'))
loadModule(require('./modules/notifier'))

app.start()
