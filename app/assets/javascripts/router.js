Zaphod.Router = Backbone.Router.extend({
	routes: {
		'': 'decks',
		'cards/:id': 'card',
		'decks/:id/cards': 'cards',
    'decks': 'decks'
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
    collection.fetch({ add: true });
	},

  decks: function() {
    var collection = new Zaphod.Decks();
    var view = new Zaphod.DecksView({ collection: collection, el: $('#content') });
    collection.fetch();
  }
});
