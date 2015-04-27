/* global pluck */
'use strict'

var dataChannel = require('backbone.radio').channel('data')

describe('Todos :: Entity', function() {
  it('should add a todo on "todos:add"', function() {
    var todo = 'Prepare trip to Spain'
    dataChannel.command('todos:add', todo)

    var todos = dataChannel.request('todos:list')
    var titles = pluck('title', todos)
    titles.should.contain('Prepare trip to Spain')
  })

  it('should not add a todo with non-string title', function() {
    var todosBefore = dataChannel.request('todos:list')
    var numTitlesBefore = todosBefore.length

    dataChannel.command('todos:add', {text: 'foo'})
    var todosAfter = dataChannel.request('todos:list')
    var numTitlesAfter = todosAfter.length

    numTitlesBefore.should.be.equal(numTitlesAfter)
  })

  it('should not add a todo containing only whitespace', function() {
    var todosBefore = dataChannel.request('todos:list')
    var numTitlesBefore = todosBefore.length

    dataChannel.command('todos:add', '')
    dataChannel.command('todos:add', ' ')
    dataChannel.command('todos:add', '\n')
    dataChannel.command('todos:add', '\t')
    dataChannel.command('todos:add', '  \n   \t ')

    var todosAfter = dataChannel.request('todos:list')
    var numTitlesAfter = todosAfter.length

    numTitlesBefore.should.be.equal(numTitlesAfter)
  })
})
