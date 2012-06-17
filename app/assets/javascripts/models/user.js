Zaphod.User = Backbone.Model.extend({
  defaults: {
    name: ""
  },

  validate: function(attrs) {
    if (!this.get('name') || _.isEmpty(this.get('name'))) {
      return { name: ['is empty'] };
    }
  },

  parse: function(json) {
    return { id: json.id, name: json.username, email: json.email };
  }
});
