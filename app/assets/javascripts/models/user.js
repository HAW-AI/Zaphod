Zaphod.User = Backbone.Model.extend({
  defaults: {
    name: '',
    email: '',
    password: ''
  },

  validate: function(attrs) {
    if (!this.get('email') || _.isEmpty(this.get('email'))) {
      return { email: ['is empty'] };
    }
    if (!this.get('password') || _.isEmpty(this.get('password'))) {
      return { password: ['is empty'] };
    }
  },

  parse: function(json) {
    return { id: json.id, name: json.username, email: json.email };
  }
});
