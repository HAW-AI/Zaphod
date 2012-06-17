Zaphod.User = Backbone.Model.extend({
  defaults: {
    username: '',
    email: '',
    password: ''
  },

  urlRoot: '/users',

  parse: function(json) {
    return { id: json.id, username: json.username, email: json.email };
  }
});
