'use strict'

// libraries
var Marionette = require('backbone.marionette')

// var λ = require('./libs/ramda')

// data components
// require('./data/todo')

// view components
// var AppLayoutView = require('./views/app-layout-view')

// channels
// var radio = require('backbone.radio')
// var appChannel = radio.channel('app')


// ###############
// ### private ###
// ###############

// var modules = []

// var registerModule = function(module) {
//   if (λ.elem(module, modules)) {
//     throw new Error('Module already registered.')
//   } else {
//     modules.push(module)
//   }
// }

// var start = function(module) {module.start()}
// var autostart = function(module) {return module.autostart}

// var startAutostartModules = λ.compose(λ.map(start), λ.filter(autostart))


// ##############
// ### public ###
// ##############

module.exports = Marionette.Application.extend({
//   layoutView: new AppLayoutView(),

//   initialize: function() {
//     appChannel.comply('module:register', registerModule)
//   },

//   onStart: function() {
//     startAutostartModules(modules)
//   },
})

// exported as singleton
// module.exports = new Application()
