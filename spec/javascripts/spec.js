//= require application
//= require_tree .

// fetch correct auth token
var tok = '';
$.ajax('/current_user.json', {
  async: false,
  dataType: 'json',
  type: 'post',
  data: {
    email: 'zaphod.1@example.com',
    password: 'bobby tables'
  },
  success: function(d) { tok = d.authentication_token; }
});
Zaphod.currentUser.set('authToken', tok);

beforeEach(function() {
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
