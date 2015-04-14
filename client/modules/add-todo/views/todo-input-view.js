var Marionette = require('backbone.marionette')

// is it better to use just "View" here?
module.exports = Marionette.ItemView.extend({
  template: '#todo-input-template',
})
