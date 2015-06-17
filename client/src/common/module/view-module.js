'use strict'

var Module = require('./module')

var layoutChannel = radio.channel('layout')

module.exports = Module.extend({

  autostart: true,

  start: function() {
    this.view = new this.viewClass()
    layoutChannel.command('show:' + this.region, this.view)
  },

  onDestroy: function() {
    this.destroyView() || this.removeView()
  },

  destroyView: function() {
    if (this.view && this.view.destroy) {
      this.view.destroy()
      return true
    }
  },

  removeView: function() {
    if (this.view) {
      this.view.remove()
    }
  },

})
