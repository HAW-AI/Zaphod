Zaphod.Deck = Backbone.Model.extend({
  defaults: {
    title: 'Deck Title',
    description: ''
  },

  urlRoot: '/decks',

  validate: function() {
    var title = this.get('title');
    if (title === undefined || (_.isString(title) && _.isEmpty(title))) {
      return { title: ['must not be empty'] };
    }
  }
});
