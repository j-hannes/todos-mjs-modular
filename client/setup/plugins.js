var $ = require('jquery')
var _ = require('lodash')

var Backbone = require('backbone')
Backbone.$ = $

var Marionette = require('backbone.marionette')

var radio = require('backbone.radio')
radio.DEBUG = true

global.$          = $
global._          = _
global.Backbone   = Backbone
global.Marionette = Marionette
global.radio      = radio
