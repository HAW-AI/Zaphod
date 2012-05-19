Zaphod.Deck = Backbone.Model.extend({
  defaults: {
    title: '',
    description: ''
  },

  urlRoot: '/decks'
});
