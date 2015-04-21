'use strict'

require('../../test-env')

var TodoCollection = require('./todo-collection')

// channels
var appChannel = require('backbone.radio').channel('app')

describe('TodoCollection', function() {
  before(function() {
    appChannel.stopComplying('')
  })

  it('should send notification when item added', function(done) {

    var collection = new TodoCollection()

    appChannel.on('todo:created', function() {
      done()
    })

    collection.add({})
  })
})
