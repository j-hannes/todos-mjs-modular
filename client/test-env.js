var Backbone = require('backbone')
var jsdom = require('jsdom')
Backbone.$ = require('jquery')(jsdom.jsdom().parentWindow)

var Radio = require('backbone.radio')
Radio.DEBUG = true
