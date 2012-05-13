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

  url: function() {
    if (this.isNew())
      return Zaphod.urlFor({ modelName: 'deck', id: 1 }, { modelName: 'card' });
    return Zaphod.urlFor({ modelName: 'card', id: this.get('id') });
  }
});
