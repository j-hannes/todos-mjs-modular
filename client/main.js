// set up environment
require('./plugins')

// initialize application
var Application = require('./app')
var app = new Application()

// load modules
require('./modules/add-todo').register('add-todo')

// start application
app.start()
