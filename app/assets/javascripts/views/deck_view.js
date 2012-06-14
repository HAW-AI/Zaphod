Zaphod.DeckView = Backbone.View.extend({
  template: JST['deck'],

  initialize: function() {
    _.bindAll(this, 'render');

    this.model.bind('change', this.render);

    this.cards = new Zaphod.Cards({ deckId: this.model.get('id') });
    this.cards.fetch();
    this.cardsView = 

    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    data.canChangeCollaborators = _.find(this.model.get('collaborators'), function(collab) {
      return collab.name === Zaphod.currentUser.get('name') &&
        collab.role === 'owner';
    });

    this.$el.html(this.template(data));
    new Zaphod.CardsView({ collection: this.cards, el: this.$('.cards')[0] });
    return this;
  }
});
