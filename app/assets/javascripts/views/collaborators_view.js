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

    _.bindAll(this, 'render', 'createCollaborator', 'reset', 'add');

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
    this.render();
    this.collection.each(this.add)
  },

  add: function(collab) {
    console.log(collab.toJSON());
    this.$('#collaborators_list').append(new Zaphod.CollaboratorItemView({ model: collab }).render().el);
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
