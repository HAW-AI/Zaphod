Zaphod.Router = Backbone.Router.extend({
	routes: {
		'': 'getCard',
		'cards/:id': 'getCard',
		'decks/:id/cards': 'getCards'
	},

	getCard: function(id) {
		id = id || 1;
		var model = new Zaphod.Card({ id: id });
		model.fetch();
		var view = new Zaphod.CardView({ model: model, el: $('#content') });
	},

	getCards: function(deckId) {
		new Zaphod.CardsView({ el: $('#content') });
	}
});
