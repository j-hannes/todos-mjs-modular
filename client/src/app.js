'use strict'

// libraries
var Marionette = require('backbone.marionette')

var f = require('../libs/functools')

// data components
var TodoCollection = require('./data/todo/todo-collection')

// view components
var AppLayoutView = require('./views/app-layout-view')

// channels
var appChannel = require('backbone.radio').channel('app')


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
  },

  getModule: function(key) {
    return modules[key]
  },

  runDestroyProcedure: function() {
    modules = {}
    appChannel.stopComplying('module:register')
    this.layoutView.destroy()
    this.todos.destroy()
    this.isDestroyed = true
  },

  onStart: function() {
    startAutostartModules(modules)
  },
})
