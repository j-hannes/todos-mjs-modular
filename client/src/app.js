'use strict'

var f = require('../libs/functools')

// data components
var TodoCollection = require('./data/todo/todo-collection')

// view components
var AppLayoutView = require('./views/app-layout-view')

// channels
var appChannel = radio.channel('app')
var dataChannel = radio.channel('data')


// ###############
// ### private ###
// ###############

var modules = {}

function alreadyRegistered(module) {
  return modules.hasOwnProperty(module.name)
}

function registerModule(module) {
  if (!module.name) {
    throw new Error('No name for module specified.')
  } else if (alreadyRegistered(module)) {
    throw new Error('Module already registered.')
  } else {
    modules[module.name] = module
  }
}

var start = function(module) {module.start()}
var autostart = function(module) {return module.autostart}

var startAutostartModules = f.compose(f.mapObj(start), f.filterObj(autostart))

var DestroyableApplication = Marionette.Application.extend({

  isDestroyed: false,

  onDestroy: function() {
    if (!this.isDestroyed) {
      this.runDestroyProcedure()
    }
  },
})


// ##############
// ### public ###
// ##############

module.exports = DestroyableApplication.extend({

  layoutView: new AppLayoutView(),

  initialize: function() {
    appChannel.comply('module:register', registerModule)
    this.todos = new TodoCollection()
    dataChannel.reply('todo-collection', this.todos)
  },

  getModule: function(key) {
    return modules[key]
  },

  runDestroyProcedure: function() {
    modules = {}
    appChannel.stopComplying('module:register')
    dataChannel.stopReplying('todo-collection')
    this.layoutView.destroy()
    this.todos.destroy()
    this.isDestroyed = true
  },

  onStart: function() {
    startAutostartModules(modules)
  },

})
