var Backbone = require('backbone')
var jsdom = require('jsdom')
Backbone.$ = require('jquery')(jsdom.jsdom().parentWindow)

var Radio = require('backbone.radio')
Radio.DEBUG = true

if (!global.haskellFlavouredJS) {
  require('./libs/ramda').expose(global)
  global.haskellFlavouredJS = true
}
