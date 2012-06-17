Zaphod.SignupView = Backbone.View.extend({
  template: JST['signup'],

  events: {
    'click .signup': 'signup',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'signup');
    this.model.bind('change destroy', this.render);
    $('#current_user').html("");
    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  },

  signup: function() {
    this.model.save({
      username: this.$('[name=email]').val().split("@")[0],
      email: this.$('[name=email]').val(),
      password: this.$('[name=password]').val()
    },{
      success: function(model, response) {
        Zaphod.router.navigate('', true);
        Zaphod.currentUserView.render();
      },
      error: function(model, response) {
        alert('Sie konnten leider nicht angemeldet werden.');
      }
    });

  }
});
