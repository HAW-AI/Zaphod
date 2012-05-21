//= require application
//= require_tree .

beforeEach(function() {
  this.addMatchers({
    toBeValid: function() {
      return this.actual.isValid();
    },

    toBeInvalid: function() {
      return !this.actual.isValid();
    }
  });
});
