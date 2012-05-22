Zaphod.CardsView = Backbone.View.extend({
  template: JST['cards'],

  events: {
    'click .add': 'createCard'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'reset', 'remove', 'add', 'createCard');

    // render to be able to add
    this.render();

    this.collection.bind('reset', this.reset);
    this.collection.bind('add', this.add);
    this.collection.bind('remove', this.reset);
    this.reset();
  },

  reset: function() {
    this.render();
    this.collection.each(this.add);
  },

  add: function(card) {
    var view = new Zaphod.CardView({ model: card, el: $('<div></div>') });
    this.$('.cards').append(view.render().el)
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  createCard: function() {
    this.collection.create({ deckId: this.collection.deckId() });
  }
});
