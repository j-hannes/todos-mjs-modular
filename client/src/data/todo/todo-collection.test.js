'use strict'

require('../../../setup/test')

var Backbone = require('backbone')

var TodoCollection = require('./todo-collection')
var TodoModel = require('./todo-model')

var dataChannel = require('backbone.radio').channel('data')

describe('TodoCollection :: Collection', function() {

  var collection

  beforeEach(function() {
    collection = new TodoCollection()
  })

  afterEach(function() {
    collection.destroy()
  })

  it('should be a Backbone Collection', function() {
    collection.should.be.an.instanceOf(Backbone.Collection)
  })

  it('should use TodoModel as collection-model', function() {
    TodoCollection.prototype.model.should.be.equal(TodoModel)
  })

  it('should fire "todo:created" event when item is added', function(done) {
    var model = new Backbone.Model()

    dataChannel.once('todo:created', function(passedModel) {
      model.should.be.equal(passedModel)
      done()
    })

    collection.add(model)
  })

  it('should add a valid title on dataChannel.todos:add', function() {
    var title = 'foo'
    dataChannel.command('todos:add', title)
    collection.length.should.be.equal(1)
    collection.at(0).get('title').should.be.equal(title)
  })

  it('should not add an invalid title on dataChannel.todos:add', function() {
    dataChannel.command('todos:add', 0)
    dataChannel.command('todos:add', '')
    dataChannel.command('todos:add', ' ')
    dataChannel.command('todos:add', '\n')
    dataChannel.command('todos:add', '\t')
    dataChannel.command('todos:add', '  \n   \t ')

    collection.length.should.be.equal(0)
  })

  it('should return a list of todos in JSON on dC.todos:list', function() {
    collection.addTodo('foo')
    var json = dataChannel.request('todos:list')

    json.should.be.deep.equal([{title: 'foo', completed: false}])
  })
})
