Zaphod.DeckItemView = Backbone.View.extend({
  template: JST['deck_item'],

  events: {
    'click .save':    'save',
    'click .destroy': 'destroy',
    'click .learn':   'learn',
    'click .show_cards': 'showCards'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'destroy', 'learn');
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
  },

  learn: function() {
    Zaphod.router.navigate(this.model.url() + '/learn', true);
  },

  showCards: function() {
    Zaphod.router.navigate(this.model.url(), true);
  }
});
