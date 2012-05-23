Zaphod.Router = Backbone.Router.extend({
  routes: {
    '': 'decks',
    'decks': 'decks',
    'decks/:id': 'deck',
    'decks/:id/cards': 'cards',
    'decks/:id/learn': 'learn',
    'cards/:id': 'card'
  },

  card: function(id) {
    id = id || 1;
    var model = new Zaphod.Card({ id: id });
    model.fetch();
    var view = new Zaphod.CardView({ model: model, el: $('#content') });
  },

  cards: function(deckId) {
    var collection = new Zaphod.Cards({ deckId: deckId });
    var view = new Zaphod.CardsView({ collection: collection, el: $('#content') });
    collection.fetch();
  },

  decks: function() {
    var collection = new Zaphod.Decks();
    var view = new Zaphod.DecksView({ collection: collection, el: $('#content') });
    collection.fetch();
  },

  deck: function(id) {
    var model = new Zaphod.Deck({ id: id });
    var view = new Zaphod.DeckView({ model: model, el: $('#content') });
    model.fetch();
  },

  learn: function(deckId) {
    var deck = new Zaphod.Deck({ id: deckId });
    deck.fetch({
      success: function() {
        new Zaphod.LearnView({ deck: deck, el: $('#content') });
      }
    });
  }
});
