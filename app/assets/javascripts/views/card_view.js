Zaphod.CardView = Backbone.View.extend({
  template: JST['card'],

  events: {
    'click .save':    'save'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.model.bind('error', this.error)
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  error: function(model, error) {
    console.error({ className: 'Zaphod.CardView', model: model, error: error });
  },

  save: function() {
    console.log('save');

    this.model.save({
      front: this.$('.front').val(),
      back:  this.$('.back').val()
    });
  }
});
