Zaphod.CollaboratorItemView = Backbone.View.extend({
  template: JST['collaborator_item'],

  tagName: 'tr',

  events: {
    'click .destroy': 'destroy'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'destroy');
    this.model.bind('change', this.render);
    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    data.user = data.user.toJSON();

    this.$el.html(this.template(data));
    return this;
  },

  destroy: function(e) {
    if (e) e.stopImmediatePropagation();
    var res = this.model.destroy();
  }
});
