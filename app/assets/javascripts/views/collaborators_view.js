Zaphod.CollaboratorsView = Backbone.View.extend({
  template: JST['collaborators'],

  events: {
    'click .add': 'createCollaborator'
  },

  initialize: function(options) {
    if (!options || !options.users || _.isArray(options.users)) {
      throw new Error('missing option "users"');
    }

    _.bindAll(this, 'render', 'createCollaborator', 'reset', 'add');

    this._allUsers = options.users;

    // render to be able to add
    this.reset();

    this.collection.bind('reset destroy', this.reset);
    this.collection.bind('add', this.add);
  },

  render: function() {
    this.$el.html(this.template({ users: this.users.toJSON() }));
    return this;
  },

  reset: function() {
    // users which are not collabs
    var that = this;
    this.users = new Zaphod.Users(this._allUsers.filter(function(user) {
      return !that.collection.find(function(collab) {
        return collab.get('user').get('id') === user.get('id');
      });
    }));

    this.render();
    this.collection.each(this.add)
  },

  add: function(collab) {
    this.$('#collaborators_list').append(new Zaphod.CollaboratorItemView({ model: collab }).render().el);
  },

  createCollaborator: function(e) {
    if (e) e.stopImmediatePropagation();

    var opts = {
      user: new Zaphod.User({
        id: parseInt(this.$('.user').val(), 10),
        username: this.$('.user option:selected').text()
      }),
      role: this.$('.role').val(),
      deckId: this.collection.deckId()
    };

    if (opts.user_id !== 'User' && opts.role !== 'Role') {
      this.collection.create(opts);
    }
  }
});
