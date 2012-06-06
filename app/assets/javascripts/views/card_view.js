Zaphod.CardView = Backbone.View.extend({
  template: JST['card'],

  events: {
    'click .destroy': 'destroy'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'destroy');
    this.model.bind('change', this.render);
    this.model.bind('error', this.error)
  },

  render: function() {
    this.$el.retainUserState(_.bind(function() {
      this.$el.html(this.template(this.model.toJSON()));
    }, this));
    this.$('.front, .back').keydown(_.bind(function() {
      this.$el.removeClass('saved');
      this.$('.status').text('Not Saved');
    }, this));
    this.$('.front, .back').doneTyping(this.save);
    return this;
  },

  error: function(model, error) {
    console.error({ className: 'Zaphod.CardView', model: model, error: error });
  },

  save: function(e) {
    if (e) e.stopImmediatePropagation();

    this.model.save({
      front: this.$('.front').val(),
      back:  this.$('.back').val()
    }, {
      success: _.bind(function() {
        this.$el.addClass('saved')
      }, this)
    });
  },

  destroy: function(e) {
		if (e) e.stopImmediatePropagation();
    this.model.destroy();
  }
});
