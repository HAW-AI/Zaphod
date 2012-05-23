Zaphod.CurrentUserView = Backbone.View.extend({
  template: JST['current_user'],

  events: {
    'click .login': 'login',
    'click .logout': 'logout'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'login', 'logout');
    this.model.bind('change destroy', this.render);
  },

  render: function() {
    var data = this.model.get('name') === 'Guest' ? {} : this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  },

  login: function() {
    this.model.save({
      email: this.$('[name=email]').val(),
      password: this.$('[name=password]').val()
    });
  },

  logout: function() {
    console.log('bam')
    this.model.destroy();
  }
});
