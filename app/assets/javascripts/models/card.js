Zaphod.Card = Backbone.Model.extend({
  defaults: {
    front: 'the front',
    back: 'the back'
  },

  initialize: function(options) {
    if (options && _.has(options, 'id') && _.has(options, 'deckId')) {
      throw new Error('only one of options.id and options.deckId is allowed');
    } else if (options && _.has(options, 'id')) {
      this.id = options.id;
    } else if (options && _.has(options, 'deckId')) {
      this.deckId = options.deckId;
    } else {
      throw new Error('options.id or options.deckId must be supplied');
    }
  },

  validate: function(attrs) {
    if (!_.has(attrs, 'front') ||
        (_.isString(attrs.front) && attrs.front.length == 0))
    {
      return { front: ['must not be empty'] };
    }
  },

  urlRoot: function() {
    return this.isNew() ? '/decks/' + this.deckId + '/cards' : '/cards';
  }
});
