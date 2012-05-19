Zaphod.DeckView = Backbone.View.extend({
  template: JST['deck'],

  initialize: function() {
    _.bindAll(this, 'render');

    this.model.bind('change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
