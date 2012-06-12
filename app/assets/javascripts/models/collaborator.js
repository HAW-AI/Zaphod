Zaphod.Collaborator = Backbone.Model.extend({
  defaults: {
    user: null,
    role: ""
  },

  validate: function(attrs) {
    var errors = {};

    if (!_.has(attrs, 'user') || !attrs.user || !attrs.user.isValid()) {
      errors.user = [ 'must be valid' ];
    }

    var validRoles = ['owner', 'editor', 'viewer'];
    if (!_.has(attrs, 'role') || !attrs.role || !_.include(validRoles, attrs.role)) {
      errors.role = [ 'must be one of ' + validRoles.join(', ') ];
    }

    return _.isEmpty(errors) ? undefined : errors;
  }
});
