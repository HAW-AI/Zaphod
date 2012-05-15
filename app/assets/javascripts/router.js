Zaphod.Router = Backbone.Router.extend({
	routes: {
		'': 'card',
		'cards/:id': 'card',
		'decks/:id/cards': 'cards'
	},

	card: function(id) {
		id = id || 1;
		var model = new Zaphod.Card({ id: id });
		model.fetch();
		var view = new Zaphod.CardView({ model: model, el: $('#content') });
	},

	cards: function(deckId) {
    var collection = new Zaphod.Cards();
		var view = new Zaphod.CardsView({ collection: collection, el: $('#content') });
    collection.fetch({ add: true });
	}
});
