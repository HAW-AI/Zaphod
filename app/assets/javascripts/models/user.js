Zaphod.User = Backbone.Model.extend({
  defaults: {
    name: '',
    email: '',
    password: ''
  },

  urlRoot: '/users',

  parse: function(json) {
    return { id: json.id, name: json.username, email: json.email };
  }
});
