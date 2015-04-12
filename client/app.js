'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.Application.extend({
  onStart: function() {
    console.log('marionette app started');
  }
});
