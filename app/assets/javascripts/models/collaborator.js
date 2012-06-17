Zaphod.Collaborator = Backbone.Model.extend({
  defaults: {
    user: null,
    role: "",
    deckId: 0
  },

  validate: function(attrs) {
    var errors = {};

    if (!_.has(attrs, 'user') || !attrs.user) {
      errors.user = [ 'must be valid' ];
    }

    var validRoles = ['owner', 'editor', 'viewer'];
    if (!_.has(attrs, 'role') || !attrs.role || !_.include(validRoles, attrs.role)) {
      errors.role = [ 'must be one of ' + validRoles.join(', ') ];
    }

    if (!attrs.deckId) {
      errors.deckId = [ 'must be included' ];
    }

    return _.isEmpty(errors) ? undefined : errors;
  },

  urlRoot: function() {
    if (this.isNew()) {
      return '/decks/' + this.get('deckId') + '/collaborators';
    } else {
      return '/collaborators';
    }
  },

  sync: function(method, model, options) {
    if (this.isValid()) {
      this.set({
        deck_id: this.get('deckId'),
        user_id: this.get('user').get('id'),
        role: this.get('role')
      });
    }

    return Backbone.sync(method, model, options);
  }
});
