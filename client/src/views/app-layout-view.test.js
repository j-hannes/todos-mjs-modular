require('../../setup/test')
require('../../setup/dom')
require('../../setup/plugins')

var $ = require('jquery')
var _ = require('lodash')
var Backbone = require('backbone')

var AppLayoutView = require('./app-layout-view')

describe('AppLayout :: View', function() {
  'use strict'

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

  it('should contain a header region', function() {
    // preparation
    createHeaderElementInDOM()

    var viewId = 'generic-view'
    var viewContent = 'my generic view content'
    var layoutView = new AppLayoutView()
    var genericView = createGenericView({id: viewId, content: viewContent})

    // execution
    layoutView.getRegion('header').show(genericView)

    // check
    $('#' + viewId).html().should.be.equal(viewContent)
  })

  // before(function() {
  //   layoutChannel.stopComplying()
  // })

  // it('should display content in the header region', function(done) {
  //   loadHtmlDocument().then(function() {
  //     // preparation
  //     new AppLayoutView()

  //     var headerContainer = Backbone.$('<div>').attr('id', 'header')
  //     Backbone.$('body').append(headerContainer)

  //     var myView = new Backbone.View({
  //       className: 'yuri',
  //     })

  //     // execution
  //     layoutChannel.command('show:header', myView)

  //     // test
  //     var myViewEl = Backbone.$('#header').find('.yuri')
  //     myViewEl.length.should.be.greaterThan(0)

  //     done()
  //   })
  // })
})
