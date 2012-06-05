Zaphod.DecksView = Backbone.View.extend({
  template: JST['decks'],

  events: {
    'click .add': 'createDeck'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'createDeck', 'reset', 'add');

    // render to be able to add
    this.render();

    this.collection.bind('reset destroy', this.reset);
    this.collection.bind('add', this.add);
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  reset: function() {
    this.render();
    this.collection.each(this.add)
  },

  add: function(deck) {
    console.log(deck)
    this.$('#decks').append(new Zaphod.DeckItemView({ model: deck }).render().el);
  },

  createDeck: function(e) {
		if (e) e.stopImmediatePropagation();
    this.collection.create();
  }
});
