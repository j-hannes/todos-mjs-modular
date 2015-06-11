'use strict'

var appChannel = radio.channel('app')

module.exports = Marionette.Object.extend({
  register: function() {
    appChannel.command('module:register', this)
  },
})
