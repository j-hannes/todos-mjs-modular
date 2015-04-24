'use strict'

// libraries
var Marionette = require('backbone.marionette')

// channels
var appChannel = require('backbone.radio').channel('app')

module.exports = Marionette.Object.extend({
  register: function(key) {
    appChannel.command('register:module', {
      name: key,
      ModuleClass: this.moduleClass,
      options: {
        autostart: this.autostart === undefined ? true : this.autostart,
      },
    })
  },
})
