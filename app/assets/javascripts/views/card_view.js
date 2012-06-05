Zaphod.CardView = Backbone.View.extend({
  template: JST['card'],

  events: {
    'click .save':    'save',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'destroy');
    this.model.bind('change', this.render);
    this.model.bind('error', this.error)
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$('.front, .back').doneTyping(this.save);
    return this;
  },

  error: function(model, error) {
    console.error({ className: 'Zaphod.CardView', model: model, error: error });
  },

  save: function(e) {
		if (e) e.stopImmediatePropagation();
    console.log('save');

    this.model.save({
      front: this.$('.front').val(),
      back:  this.$('.back').val()
    });
  },

  destroy: function(e) {
		if (e) e.stopImmediatePropagation();
    this.model.destroy();
  }
});
