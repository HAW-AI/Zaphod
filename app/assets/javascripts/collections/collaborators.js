Zaphod.Collaborators = Backbone.Collection.extend({
  model: Zaphod.Collaborator,
  url: function() {
    return '/decks/' + this.get('deckId') + '/collaborators';
  },

  initialize: function(options) {
    if (!options || !options.deckId) {
      throw new Error('options must include "deckId"');
    }

    this._deckId = options.deckId;
  },

  deckId: function() {
    return this._deckId;
  }
});
