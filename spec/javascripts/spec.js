//= require application
//= require_tree .

beforeEach(function() {
  Zaphod.currentUser.set('authToken', 'ZPYxqZ9tN2Apy9ZMxTHE');


  this.addMatchers({
    toBeValid: function() {
      return this.actual.isValid();
    },

    toBeInvalid: function() {
      return !this.actual.isValid();
    },

    toIncludeSubstring: function(str) {
      return this.actual.indexOf(str) !== -1;
    }
  });
});
