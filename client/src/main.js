'use strict'

// set up environment
require('../setup/plugins')

// load application
var Application = require('./app')
var app = window.app = new Application()

var loadModule = function(Module) {
  var module = new Module()
  module.register()
}

loadModule(require('./modules/add-todo'))
loadModule(require('./modules/notifier'))

// start application
app.start()
