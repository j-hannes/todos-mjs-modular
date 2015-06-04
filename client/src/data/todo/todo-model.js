'use strict'

var Backbone = require('backbone')

module.exports = Backbone.Model.extend({

  defaults: {
    completed: false,
  },

  validate: function(attributes) {
    if (!attributes.title || !attributes.title.trim()) {
      return 'empty title'
    }
  },

})
