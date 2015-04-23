'use strict'

// set up
require('../../test-env')

// libraries
var chai = require('chai')
var expect = chai.expect
chai.should()

// channels
var appChannel = require('backbone.radio').channel('app')

// modules
var notifierModule = require('./')

describe('NotifierModule', function() {

  describe('register', function() {
    before(function() {
      appChannel.stopComplying('')
    })

    it('should fire an "register:module" command', function(done) {
      appChannel.complyOnce('register:module', function() {
        done()
      })
      notifierModule.register()
    })

    it('should register module with key passed', function(done) {
      var key = 'a-random-key'

      appChannel.complyOnce('register:module', function(options) {
        expect(options.name).to.be.equal(key)
        done()
      })

      notifierModule.register(key)
    })
  })
})
