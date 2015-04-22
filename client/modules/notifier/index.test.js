'use strict'

// set up
require('../../test-env')

// libraries
var expect = require('chai').expect

// channels
var appChannel = require('backbone.radio').channel('app')

// modules
var addTodoModule = require('./')

describe('AddTodoModule', function() {
  describe('register', function() {
    before(function() {
      appChannel.stopComplying('')
    })

    it('should fire an "register:module" command', function(done) {
      appChannel.complyOnce('register:module', function() {
        done()
      })
      addTodoModule.register()
    })

    it('should register module with key passed', function(done) {
      var key = 'a-random-key'

      appChannel.complyOnce('register:module', function(options) {
        expect(options.name).to.be.equal(key)
        done()
      })

      addTodoModule.register(key)
    })
  })
})
