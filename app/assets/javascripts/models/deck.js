Zaphod.Deck = Backbone.Model.extend({
  defaults: {
    title: 'Deck Title',
    description: '',
    collaborators: []
  },

  urlRoot: '/decks',

  validate: function() {
    var title = this.get('title');
    if (title === undefined || (_.isString(title) && _.isEmpty(title))) {
      return { title: ['must not be empty'] };
    }
  },

  parse: function(json) {
    var data = _.clone(json);
    data.collaborators = _.map(data.collaborators, function(collab) {
      return {
        name: collab.username,
        role: collab.role,
        id: collab.id,
        userId: collab.user_id
      };
    });
    return data;
  },

  collaborators: function() {
    return this.get('collaborators');
  }
});
