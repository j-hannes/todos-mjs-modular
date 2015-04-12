'use strict';

module.exports = function() {
  this.Given(/^I visit the application$/, function() {
    this.driver.get('http://localhost:8080');
  });

  this.When(/^I enter \"([^\"]*)\"$/, function(value) {
    new this.Widget({
      root: '#new-todo',
    }).sendKeys(value, '\uE007');
  });

  this.Then(/^I should see \"([^\"]*)\"$/, function(expected) {
    var List = this.Widget.List.extend({
      root: '#todo-list',
      childSelector: 'li',
    });

    return new List().readAt(0).should.eventually.eql(expected);
  });
};
