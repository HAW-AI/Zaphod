Zaphod.Card = Backbone.Model.extend({
	defaults: {
		front: 'the front',
		back: 'the back'
	},

	url: function() {
		return Zaphod.urlFor({ modelName: 'card', id: this.get('id') });
	}
});
