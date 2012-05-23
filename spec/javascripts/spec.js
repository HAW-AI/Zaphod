//= require application
//= require_tree .

beforeEach(function() {
  // must be set by hand for each db :(
  Zaphod.currentUser.set('authToken', 'p5Wm9xCyE26eS2TK2Yod');


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
