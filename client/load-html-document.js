'use strict'

var jsdom = require('jsdom')
var Backbone = require('backbone')

module.exports = function(options) {
  return {
    then: function(callback) {
      var environment = {
        done: function(errors, window) {
          Backbone.$ = require('jquery')(window)
          callback()
        },
      }

      if (options && options.live) {
        environment.url = 'http://localhost:8080'
      } else {
        environment.html = '<!doctype html><html><body></body></html>'
      }

      jsdom.env(environment)
    },
  }
}
