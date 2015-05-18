var ft = require('./functools')

describe('FuncTools :: Lib', function() {
  'use strict'

  describe('words :: String -> [String]', function() {
    it('should split a string on newline breaks', function() {
      var sentence = 'word word'
      var words = ft.words(sentence)
      words.should.be.deep.equal(['word', 'word'])
    })
  })

  describe('lines :: String -> [String]', function() {
    it('should split a string on newline breaks', function() {
      var sentence = 'line\nline'
      var lines = ft.lines(sentence)
      lines.should.be.deep.equal(['line', 'line'])
    })
  })

  describe('elem :: [a] -> Boolean', function() {
    it('should be an alias vor `contains`', function() {
      ft.elem.should.be.equal(ft.contains)
    })
  })
})
