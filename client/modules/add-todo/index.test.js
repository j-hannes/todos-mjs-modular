'use strict'

require('../../test-env')

var Marionette = require('backbone.marionette')
var addTodoModule = require('./')
var layoutChannel = require('backbone.radio').channel('layout')

describe('AddTodo :: Module', function() {
  before(function() {
    var Backbone = require('backbone')
    Backbone.$ = require('jquery')(window)

    layoutChannel.reset()
  })

  it('should send command to show its view in header region', function(done) {
    layoutChannel.complyOnce('show:header', function(view) {
      view.should.be.an.instanceOf(Marionette.ItemView)
      done()
    })

    addTodoModule.start()
  })
})
