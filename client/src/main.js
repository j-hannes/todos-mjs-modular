// set up environment
require('../setup/plugins')

// load application
var Application = require('./app')
var app = new Application()

// load modules
var AddTodoModule = require('./modules/add-todo')
var addTodoModule = new AddTodoModule()
addTodoModule.register()

// require('./modules/notifier').register()

// start application
app.start()
