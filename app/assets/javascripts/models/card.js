Zaphod.Card = Backbone.Model.extend({
  defaults: {
    front: 'the front',
    back: 'the back'
  },

  validate: function(attrs) {
    var errors = {};

    if (!_.has(attrs, 'front') ||
        (_.isString(attrs.front) && attrs.front.length == 0))
    {
      errors.front = 'must not be empty';
    }

    return _.isEmpty(errors) ? undefined : errors;
  },

  url: function() {
    return Zaphod.urlFor({ modelName: 'card', id: this.get('id') });
  }
});
