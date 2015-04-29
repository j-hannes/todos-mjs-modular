'use strict'

require('../../test-env')

var Backbone = require('backbone')
var sinon = require('sinon')
var notifier = require('./')
var dataChannel = require('backbone.radio').channel('data')

describe('notifier :: Module', function() {
  it('reacts to "todo:created" on dataChannel', function() {
    // store console.log
    var log = console.log

    //modify console.log + spy
    console.log = function() {}
    var spy = sinon.spy(console, 'log')

    // set up test
    notifier.start()
    var todo = new Backbone.Model({title: 'foo'})
    dataChannel.trigger('todo:created', todo)

    // check
    spy.should.have.been.calledWith({title: 'foo' })

    // restore console.log
    console.log = log
  })
})
