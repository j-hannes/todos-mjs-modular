var Marionette = require('backbone.marionette')

module.exports = Marionette.ItemView.extend({

  tagName: 'li',

  template: '#todo-item-template',

})
