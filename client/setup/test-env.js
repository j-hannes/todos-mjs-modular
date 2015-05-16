'use strict'

var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom

  global.document = jsdom()
  global.window = document.parentWindow
}

var Backbone = require('backbone')
Backbone.$ = require('jquery')
