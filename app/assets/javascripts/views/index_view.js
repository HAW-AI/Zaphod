Zaphod.IndexView = Backbone.View.extend({
  template: JST['index'],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template({}));
    return this;
  },
});
