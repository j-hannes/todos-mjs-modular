'use strict'

require('../test-env')

var Backbone = require('backbone')

var AppLayoutView = require('./app-layout-view')
var layoutChannel = require('backbone.radio').channel('layout')

var loadHtmlDocument = require('../load-html-document')

describe('AppLayout :: View', function() {
  before(function() {
    layoutChannel.stopComplying()
  })

  it('should display content in the header region', function(done) {
    loadHtmlDocument().then(function() {
      // preparation
      new AppLayoutView()

      var headerContainer = Backbone.$('<div>').attr('id', 'header')
      Backbone.$('body').append(headerContainer)

      var myView = new Backbone.View({
        className: 'yuri',
      })

      // execution
      layoutChannel.command('show:header', myView)

      // test
      var myViewEl = Backbone.$('#header').find('.yuri')
      myViewEl.length.should.be.greaterThan(0)

      done()
    })
  })
})
