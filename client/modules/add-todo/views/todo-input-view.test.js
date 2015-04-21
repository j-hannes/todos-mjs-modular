'use strict'

require('../../../test-env')

var TodoInputView = require('./todo-input-view')

// channels
var appChannel = require('backbone.radio').channel('app')

describe('TodoInputView', function() {
  before(function() {
    appChannel.stopComplying('')
  })

  it('fires create:todo command on submit event', function(done) {

    this.view = new TodoInputView()

    appChannel.comply('create:todo', function() {
      done()
    })

    this.view.$el.trigger('submit')
  })

  after(function() {
    this.view.destroy()
  })
})
