'use strict'

var Marionette = require('backbone.marionette')

// var layoutChannel = require('backbone.radio').channel('layout')

module.exports = Marionette.LayoutView.extend({
  el: 'body',

  regions: {
    header: '#header',
  },

  // initialize: function() {
  //   this.registerCommands()
  // },

  // registerCommands: function() {
  //   // layoutChannel.stopComplying('show:header')
  //   layoutChannel.comply('show:header', function(view) {
  //     this.header.show(view)
  //   }, this)
  // },
})
