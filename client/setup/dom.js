if (!global.document || !global.window) {
  'use strict'

  var jsdom = require('jsdom').jsdom

  global.document = jsdom()
  global.window = document.parentWindow
}
