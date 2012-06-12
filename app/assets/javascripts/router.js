Zaphod.Router = Backbone.Router.extend({
  routes: {
    '': 'nothing',
    'decks': 'decks',
    'decks/:id': 'deck',
    'decks/:id/cards': 'cards',
    'decks/:id/learn': 'learn',
    'cards/:id': 'card'
  },

  nothing: function() {
    // what to do next?
  },

  card: function(id) {
    if (!Zaphod.currentUser.get('isLoggedIn')) { Zaphod.router.navigate('', true); return; }
    id = id || 1;
    var model = new Zaphod.Card({ id: id });
    model.fetch();
    var view = new Zaphod.CardView({ model: model, el: $('#content') });
  },

  cards: function(deckId) {
    if (!Zaphod.currentUser.get('isLoggedIn')) { Zaphod.router.navigate('', true); return; }
    var collection = new Zaphod.Cards({ deckId: deckId });
    var view = new Zaphod.CardsView({ collection: collection, el: $('#content') });
    collection.fetch();
  },

  decks: function() {
    if (!Zaphod.currentUser.get('isLoggedIn')) { Zaphod.router.navigate('', true); return; }
    var collection = new Zaphod.Decks();
    var view = new Zaphod.DecksView({ collection: collection, el: $('#content') });
    collection.fetch();
  },

  deck: function(id) {
    if (!Zaphod.currentUser.get('isLoggedIn')) { Zaphod.router.navigate('', true); return; }
    var model = new Zaphod.Deck({ id: id });
    var view = new Zaphod.DeckView({ model: model, el: $('#content') });
    model.fetch();
  },

  learn: function(deckId) {
    if (!Zaphod.currentUser.get('isLoggedIn')) { Zaphod.router.navigate('', true); return; }
    var deck = new Zaphod.Deck({ id: deckId });
    deck.fetch({
      success: function() {
        new Zaphod.LearnView({ deck: deck, el: $('#content') });
      }
    });
  }
});
