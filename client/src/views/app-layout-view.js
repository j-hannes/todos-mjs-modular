'use strict'

var Marionette = require('backbone.marionette')

var layoutChannel = require('backbone.radio').channel('layout')

function showViewInHeader(view) {
  this.header.show(view)
}

module.exports = Marionette.LayoutView.extend({
  el: 'body',

  regions: {
    header: '#header',
  },

  initialize: function() {
    this.registerCommands()
  },

  registerCommands: function() {
    layoutChannel.comply('show:header', showViewInHeader, this)
  },

  onDestroy: function() {
    layoutChannel.stopComplying('show:header')

    // bad!
    var $ = require('jquery')
    $('html').html('<body></body>')
  },
})
