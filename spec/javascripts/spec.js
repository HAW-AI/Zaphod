//= require application
//= require_tree .

beforeEach(function() {
  // must be set by hand for each db :(
  Zaphod.currentUser.set('authToken', 'RLqTedGph74WB2dPYJHt');


  this.addMatchers({
    toBeValid: function() {
      return this.actual.isValid();
    },

    toBeInvalid: function() {
      return !this.actual.isValid();
    },

    toIncludeSubstring: function(str) {
      return this.actual.indexOf(str) !== -1;
    },

    toBeEqualTo: function(obj) {
      return _.isEqual(this.actual, obj);
    }
  });
});
