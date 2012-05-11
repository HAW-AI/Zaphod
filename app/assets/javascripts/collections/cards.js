Zaphod.Cards = Backbone.Collection.extend({
  model: Zaphod.Card,

  url: function() {
    return Zaphod.urlFor({ modelName: 'deck', id: 1 }, { modelName: 'card' });
  }
});