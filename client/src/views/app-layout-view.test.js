'use strict'

var AppLayoutView = require('./app-layout-view')

var layoutChannel = radio.channel('layout')

var GenericView = Backbone.View.extend({
  render: function() {
    this.$el.html(this.template())
    return this
  },
})

var bodyAppendDiv = function(options) {
  $('body').append('<div id="' + options.id + '"></div>')
}

function createGenericView(options) {
  var view = new GenericView({id: options.id})
  view.template = _.template(options.content)
  return view
}

function cleanBodyContent() {
  $('body').empty()
}

describe('AppLayoutView :: Marionette.LayoutView', function() {

  var layoutView

  beforeEach(function() {
    layoutView = new AppLayoutView()
  })

  afterEach(function() {
    layoutView.destroy()
    cleanBodyContent()
  })

  var shouldContainRegion = function(regionName) {
    // preparation
    bodyAppendDiv({id: regionName})

    var viewId = 'generic-view'
    var viewContent = 'my generic view content'
    var genericView = createGenericView({id: viewId, content: viewContent})

    // execution
    layoutView.getRegion(regionName).show(genericView)

    // check
    $('#' + viewId).html().should.be.equal(viewContent)

  }

  var shouldDisplayContentInRegion = function(regionName) {
    bodyAppendDiv({id: regionName})

    var view = new Backbone.View()
    view.$el.append('hastenichgesehn')

    layoutChannel.command('show:' + regionName, view)

    $('#' + regionName).html().should.contain('hastenichgesehn')
  }

  it('should contain a header region', function() {
    shouldContainRegion('header')
  })

  it('should contain a main region', function() {
    shouldContainRegion('main')
  })

  it('should display content in the header region', function() {
    shouldDisplayContentInRegion('header')
  })

  it('should display content in the main region', function() {
    shouldDisplayContentInRegion('main')
  })

})
