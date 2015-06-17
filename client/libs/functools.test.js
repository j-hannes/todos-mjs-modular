var f = require('./functools')

describe('FuncTools', function() {
  'use strict'

  describe('words :: String -> [String]', function() {
    it('should split a string on newline breaks', function() {
      var sentence = 'word word'
      var words = f.words(sentence)
      words.should.be.deep.equal(['word', 'word'])
    })
  })

  describe('lines :: String -> [String]', function() {
    it('should split a string on newline breaks', function() {
      var sentence = 'line\nline'
      var lines = f.lines(sentence)
      lines.should.be.deep.equal(['line', 'line'])
    })
  })

  describe('elem :: [a] -> Boolean', function() {
    it('should be an alias vor `contains`', function() {
      f.elem.should.be.equal(f.contains)
    })
  })

  describe('filterObj :: (v -> Boolean) -> {k: v} -> {k: v}', function() {
    it('should filter object values according to filter function', function() {
      var filter = function(x) {return x > 1}

      var expectationTable = [
        [{},              '->', {}],
        [{a:1},           '->', {}],
        [{a:2},           '->', {a:2}],
        [{a:1, b:2},      '->', {b:2}],
        [{a:1, b:2, c:3}, '->', {b:2, c:3}],
        [{a:2, b:1, c:3}, '->', {a:2, c:3}],
        [{a:0, b:1, c:3}, '->', {c:3}],
        [{a:3, b:4, c:5}, '->', {a:3, b:4, c:5}],
      ]

      var test = function(evaluationPair) {
        var testObj = evaluationPair[0]
        var expected = evaluationPair[2]

        f.filterObj(filter, testObj).should.be.deep.equal(expected)
      }

      f.map(test, expectationTable)
    })
  })
})
