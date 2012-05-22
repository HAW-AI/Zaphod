Zaphod.Cards = Backbone.Collection.extend({
  model: Zaphod.Card,

  deckId: function() { return this._deckId; },

  // options must include a deckId
  initialize: function(models, options) {
    // models are optional
    if (!options) {
      options = models;
      models = undefined;
    }

    if (models) {
      this.reset(models, { silent: true, parse: options.parse });
    }

    if (!options || !_.has(options, 'deckId')) {
      throw new Error('missing attribute "deckId" in options');
    }

    this._deckId = options.deckId;
  },

  url: function() {
    return '/decks/' + this.deckId() + '/cards';
  }

});
