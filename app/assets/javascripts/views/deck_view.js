Zaphod.DeckView = Backbone.View.extend({
  template: JST['deck'],

  initialize: function() {
    _.bindAll(this, 'render');

    this.model.bind('change', this.render);

    this.cards = new Zaphod.Cards({ deckId: this.model.get('id') });
    this.cards.fetch();

    this.users = new Zaphod.Users();
    this.users.fetch({ async: false }); // dirty to make it to release date

    this.collaborators = new Zaphod.Collaborators({ deckId: this.model.get('id') });

    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    data.canChangeCollaborators = _.find(this.model.get('collaborators'), function(collab) {
      return collab.name === Zaphod.currentUser.get('name') &&
        collab.role === 'owner';
    });

    this.$el.html(this.template(data));

    if (data.canChangeCollaborators) {
      data.users = this.users.toJSON();
      var collabs = _.map(this.model.get('collaborators'), function(c) {
        return new Zaphod.Collaborator({
          user: new Zaphod.User({ username: c.name, id: c.userId }),
          role: c.role,
          id: c.id
        });
      })
      this.collaborators.reset(collabs);

      new Zaphod.CollaboratorsView({
        collection: this.collaborators,
        el: this.$('.collaborators')[0],
        users: this.users
      });
    }


    new Zaphod.CardsView({ collection: this.cards, el: this.$('.cards')[0] });
    return this;
  }
});
