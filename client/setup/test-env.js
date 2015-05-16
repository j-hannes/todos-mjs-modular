'use strict'

// set up test libraries
var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

// create the DOM for view testing
if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom

  global.document = jsdom()
  global.window = document.parentWindow
}

// set common libraries as globals
global.$ = require('jquery')
global.Backbone = require('backbone')

// set Backbone's jquery to the global jquery before loading Marionette
global.Backbone.$ = global.$

// set remaining libraries as globals
global.Marionette = require('backbone.marionette')
