'use strict'

// libraries
var Marionette = require('backbone.marionette')
require('./libs/ramda').expose(global)

// components
var AppLayoutView = require('./views/app-layout-view')

// channels
var appChannel = require('backbone.radio').channel('app')


// lib
var startModule = function(module) {module.module.start()}
var isAutostart = function(module) {return module.isAutostart}


// local data
var modules = {}

// private functions
var startAutostartModules = compose(forEach(startModule), filter(isAutostart))

var registerModule = function(options) {
  var module = new options.ModuleClass()
  modules[options.name] = {
    module: module,
    ptions: options.options,
  }
  module.start()
}

var registerCommands = function() {
  appChannel.comply('register:module', registerModule)
}

var startRegisteredModules = function() {
  startAutostartModules(modules)
}


// API (exposed functions)
module.exports = Marionette.Application.extend({
  layoutView: new AppLayoutView(),

  initialize: function() {
    registerCommands()
  },

  onStart: function() {
    startRegisteredModules()
  },
})
