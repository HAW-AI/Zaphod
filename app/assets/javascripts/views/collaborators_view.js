Zaphod.CollaboratorsView = Backbone.View.extend({
  template: JST['collaborators'],

  events: {
    'click .add': 'createCollaborator'
  },

  initialize: function(options) {
    if (!options || !options.users || _.isArray(options.users)) {
      throw new Error('missing option "users"');
    }

    this.users = options.users;

    _.bindAll(this, 'render', 'createCollaborator');
    this.collection.bind('change', this.render);
    this.render();
  },

  render: function() {
    var data = {
      collaborators: this.collection.toJSON(),
      users: this.users.toJSON()
    }
    _.each(data.collaborators, function(c) {
      c.user = c.user.toJSON();
    });

    this.$el.html(this.template(data));
    return this;
  },

  createCollaborator: function(e) {
    if (e) e.stopImmediatePropagation();

    var opts = {
      user: new Zaphod.User({
        id: parseInt(this.$('.user').val(), 10),
        name: this.$('.user option:selected').text()
      }),
      role: this.$('.role').val(),
      deckId: this.collection.deckId()
    };

    if (opts.user_id !== 'User' && opts.role !== 'Role') {
      var isAlreadyCollab = this.collection.find(function(c) {
        return c.get('user').get('id') === opts.user.get('id')
      });

      if (!isAlreadyCollab) {
        this.collection.create(opts);
      }
    }
  }
});
