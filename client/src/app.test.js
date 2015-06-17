var sinon = require('sinon')

var Application = require('./app')
var AppLayoutView = require('./views/app-layout-view')
var TodoCollection = require('./data/todo/todo-collection')

var appChannel = radio.channel('app')
var dataChannel = radio.channel('data')

describe('App', function() {
  'use strict'

  var app

  beforeEach(function() {
    app = new Application()
  })

  afterEach(function() {
    app.destroy()
  })

  it('should be a Marionette.Application', function() {
    app.should.be.instanceOf(Marionette.Application)
  })

  it('should have AppLayoutView as layoutView', function() {
    app.layoutView.should.be.instanceOf(AppLayoutView)
  })

  it('should register a module via appChannel "module:register"', function() {
    // build
    var module = {name: 'Yuri\'s module'}

    // operate
    appChannel.command('module:register', module)

    // check
    app.getModule('Yuri\'s module').should.be.equal(module)
  })

  it('should not allow module to register with no name specified', function() {
    var module = {}
    var registerWithNoName = function() {
      appChannel.command('module:register', module)
    }

    registerWithNoName.should.throw('No name for module specified')
  })

  it('should not allow a module to register twice', function() {
    // build
    var module = {name: 'Rambo\'s module'}
    appChannel.command('module:register', module)

    // operate
    var registerTwice = function() {
      appChannel.command('module:register', module)
    }

    // check
    registerTwice.should.throw('Module already registered.')
  })

  it('should start registered autostart modules on start', function() {
    var module = {
      start: sinon.spy(),
      autostart: true,
      name: 'foo-module',
    }

    // execution
    appChannel.command('module:register', module)
    app.start()

    // test
    module.start.should.have.been.called
  })

  it('should not start registered modules with no autostart', function() {
    var module = {
      start: sinon.spy(),
      name: 'foo-module',
    }

    // execution
    appChannel.command('module:register', module)
    app.start()

    // test
    module.start.should.not.have.been.called
  })

  it('should initialize a todo collection', function() {
    app.should.have.property('todos')
    app.todos.should.be.an.instanceOf(TodoCollection)
  })

  it('should destroy the todo collection when app gets destroyed', function() {
    var spy = sinon.spy(app.todos, 'destroy')
    app.destroy()
    spy.should.have.been.called
  })

  it('should provide todo-collection on request', function() {
    dataChannel.request('todo-collection').should.be.equal(app.todos)
  })

})
