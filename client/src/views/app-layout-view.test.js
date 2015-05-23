'use strict'

// imports and setup

require('../../setup/test')
require('../../setup/dom')
require('../../setup/plugins')

var $ = require('jquery')
var _ = require('lodash')
var Backbone = require('backbone')

var AppLayoutView = require('./app-layout-view')

var layoutChannel = require('backbone.radio').channel('layout')

// local API

function createHeaderElementInDOM() {
  $('body').append('<div id="header"></div>')
}

function createGenericView(options) {
  var GenericView = Backbone.View.extend({
    id: options.id,
    template: _.template(options.content),
    render: function() {
      this.$el.html(this.template())
      return this
    },
  })
  return new GenericView()
}

function cleanBodyContent() {
  $('body').empty()
}

// test suite

describe('AppLayoutView :: Marionette.LayoutView', function() {

  var layoutView

  beforeEach(function() {
    layoutView = new AppLayoutView()
  })

  afterEach(function() {
    layoutView.destroy()
    cleanBodyContent()
  })

  it('should contain a header region', function() {
    // preparation
    createHeaderElementInDOM()

    var viewId = 'generic-view'
    var viewContent = 'my generic view content'
    var genericView = createGenericView({id: viewId, content: viewContent})

    // execution
    layoutView.getRegion('header').show(genericView)

    // check
    $('#' + viewId).html().should.be.equal(viewContent)
  })

  it('should display content in the header region', function() {
    createHeaderElementInDOM()

    var view = new Backbone.View()
    view.$el.append('hastenichgesehn')

    layoutChannel.command('show:header', view)

    $('#header').html().should.contain('hastenichgesehn')
  })
})
