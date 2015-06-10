'use strict'

// channels
var appChannel = radio.channel('app')


// ##############
// ### public ###
// ##############

module.exports = Marionette.Object.extend({
  register: function() {
    appChannel.command('module:register', this)
  },
})
