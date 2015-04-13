'use strict';

var Marionette = require('backbone.marionette');
var AppView = require('./views/app-view.js');

module.exports = Marionette.Application.extend({
  rootView: new AppView(),

  onStart: function() {
    console.log('marionette app started');
  },
});
