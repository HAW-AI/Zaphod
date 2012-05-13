Zaphod.Card = Backbone.Model.extend({
  defaults: {
    front: 'the front',
    back: 'the back'
  },

  validate: function(attrs) {
    if (!_.has(attrs, 'front') ||
        (_.isString(attrs.front) && attrs.front.length == 0))
    {
      return { front: ['must not be empty'] };
    }
  },

  urlRoot: function() {
    return this.isNew() ? '/decks/1/cards' : '/cards';
  }
});
