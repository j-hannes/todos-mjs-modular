'use strict'

// libraries
var Marionette = require('backbone.marionette')

var f = require('../libs/functools')

// data components
// require('./data/todo')

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
  if (alreadyRegistered(module)) {
    throw new Error('Module already registered.')
  } else {
    modules[module.name] = module
  }
}

var start = function(module) {module.start()}
var autostart = function(module) {return module.autostart}

var startAutostartModules = f.compose(f.mapObj(start), f.filterObj(autostart))


// ##############
// ### public ###
// ##############

module.exports = Marionette.Application.extend({
  layoutView: new AppLayoutView(),

  initialize: function() {
    appChannel.comply('module:register', registerModule)
  },

  getModule: function(key) {
    return modules[key]
  },

  onDestroy: function() {
    modules = {}
    appChannel.stopComplying('module:register')
    this.layoutView.destroy()
  },

  onStart: function() {
    startAutostartModules(modules)
  },
})
