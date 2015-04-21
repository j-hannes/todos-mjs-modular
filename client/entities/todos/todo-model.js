var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    completed: false,
  },

  validate: function(/*model*/) {
    // TODO: add validation
  },
})
