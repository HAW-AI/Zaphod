Zaphod.CardsView = Backbone.View.extend({
  template: JST['cards'],

  events: {
    'click .add': 'createCard'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'add', 'createCard');

    // render to be able to add
    this.render();

    this.collection.bind('add', this.add);
    this.collection.each(this.add);
  },

  add: function(card) {
    var view = new Zaphod.CardView({ model: card, el: $('<div></div>') });
    console.log($(this.el))
    this.$('.cards').append(view.render().el)
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  createCard: function() {
    this.collection.create({ deckId: 1 });
  }
});
