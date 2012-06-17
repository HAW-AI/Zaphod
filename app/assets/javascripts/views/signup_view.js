Zaphod.SignupView = Backbone.View.extend({
  template: JST['signup'],

  events: {
    'click .signup': 'signup',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'signup');
    this.model.bind('change destroy', this.render);
    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  },

  signup: function() {
    this.model.save({
      name: this.$('[name=email]').val().split("@")[0],
      email: this.$('[name=email]').val(),
      password: this.$('[name=password]').val()
    },
    {
      success: function() {
        Zaphod.router.navigate('', true);
      },
      error: function() {
        alert('Sie konnten leider nicht angemeldet werden.');
      }
    }

    );

  }
});
