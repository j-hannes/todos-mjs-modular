require('./plugins')

var jsdom = require('mocha-jsdom')
jsdom({
  url: 'http://localhost:8080',
  html: undefined,
})

var chai = require('chai')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)
