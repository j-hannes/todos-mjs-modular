// set up environment
require('./plugins')

// initialize application
var Application = require('./app')
var app = new Application()

// load modules (self registering)
require('./modules/add-todo')

// start application
app.start()
