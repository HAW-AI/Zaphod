Zaphod.DeckItemView = Backbone.View.extend({
  template: JST['deck_item'],

  events: {
    'click .save':    'save',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'destroy');
    this.model.bind('change', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  save: function() {
    this.model.save({
      title: this.$('.title').val(),
      description:  this.$('.description').val()
    });
  },

  destroy: function() {
    this.model.destroy();
  }
});
