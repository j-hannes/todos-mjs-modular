'use strict'

// libraries
var Marionette = require('backbone.marionette')
require('./libs/ramda').expose(global)

// components
var AppLayoutView = require('./views/app-layout-view')

// channels
var appChannel = require('backbone.radio').channel('app')


// ####################
// ### private area ###
// ####################

var modules = []

var registerModule = function(options) {
  var module = new options.ModuleClass()
  modules.push({
    name: options.name,
    module: module,
    moduleOptions: options.options,
  })
}

var registerCommands = function() {
  appChannel.comply('register:module', registerModule)
}

var startModule = function(module) {module.module.start()}
var isAutostart = function(module) {return module.moduleOptions.autostart}

var startAutostartModules = compose(forEach(startModule), filter(isAutostart))


// ###########
// ### API ###
// ###########

module.exports = Marionette.Application.extend({
  layoutView: new AppLayoutView(),

  initialize: function() {
    registerCommands()
  },

  onStart: function() {
    startAutostartModules(modules)
  },
})
