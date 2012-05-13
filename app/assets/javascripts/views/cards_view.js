Zaphod.CardsView = Backbone.View.extend({
  template: JST['cards'],

  events: {
    'click .add': 'createCard'
  },

  initialize: function() {
  _.bindAll(this, 'render', 'createCard');

    this.collection.bind('add reset delete', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(this.template({ cards: this.collection.invoke('toJSON') }));
    return this;
  },

  createCard: function() {
    this.collection.create({ deck_id: 1 });
  }
});
