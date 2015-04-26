// set up environment
require('./plugins')

// load application
var app = require('./app')

// load modules
require('./modules/add-todo').register('add-todo')
require('./modules/notifier').register('notifier')

// start application
app.start()
