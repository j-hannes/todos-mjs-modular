'use strict'

require('../../../setup/dom')
require('../../../setup/test')
require('../../../setup/plugins')

// var Marionette = require('backbone.marionette')

var AddTodoModule = require('./')
var Module = require('../../common/module')
var TodoInputView = require('./views/todo-input-view')

// var appChannel = require('backbone.radio').channel('app')
var layoutChannel = require('backbone.radio').channel('layout')

describe('AddTodo :: Module', function() {

  it('should be a Module', function() {
    var addTodoModule = new AddTodoModule()
    addTodoModule.should.be.an.instanceOf(Module)
  })

  it('should send a show:header command with a TodoInputView instance on start',
     function(done) {
    function testTodoInputViewInstance(view) {
      view.should.be.an.instanceOf(TodoInputView)
      layoutChannel.stopComplying('show:header', testTodoInputViewInstance)
      done()
    }

    layoutChannel.comply('show:header', testTodoInputViewInstance)

    var addTodoModule = new AddTodoModule()
    addTodoModule.start()
  })

  it('should have autostart set to true', function() {
    var addTodoModule = new AddTodoModule()
    addTodoModule.should.have.property('autostart')
    addTodoModule.autostart.should.be.true
  })

  // it('should send command to show its view in header region', function(done){
  //   layoutChannel.complyOnce('show:header', function(view) {
  //     view.should.be.an.instanceOf(Marionette.ItemView)
  //     done()
  //   })

  //   addTodoModule.start()
  // }
})
