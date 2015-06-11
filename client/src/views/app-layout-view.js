'use strict'

var layoutChannel = radio.channel('layout')

var showViewInHeader = function(view) {
  this.header.show(view)
}

var showViewInMain = function(view) {
  this.main.show(view)
}

module.exports = Marionette.LayoutView.extend({
  el: 'body',

  regions: {
    header: '#header',
    main:   '#main',
  },

  initialize: function() {
    this.registerCommands()
  },

  registerCommands: function() {
    layoutChannel.comply('show:header', showViewInHeader, this)
    layoutChannel.comply('show:main',   showViewInMain,   this)
  },

  onDestroy: function() {
    layoutChannel.stopComplying('show:header')
    layoutChannel.stopComplying('show:main')

    // bad!
    var $ = require('jquery')
    $('html').html('<body></body>')
  },
})
