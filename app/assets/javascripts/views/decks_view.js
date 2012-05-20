Zaphod.DecksView = Backbone.View.extend({
  template: JST['decks'],

  initialize: function() {
    _.bindAll(this, 'render');

    // render to be able to add
    this.render();

    this.collection.bind('add reset remove', this.render);
  },

  render: function() {
    var data = { decks: this.collection.invoke('toJSON') };
    this.$el.html(this.template(data, this._helpers));
    return this;
  }
});
