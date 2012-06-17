Zaphod.CollaboratorsView = Backbone.View.extend({
  template: JST['collaborators'],
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('change', this.render);
    this.render();
  },

  render: function() {
    console.log(this.collection.toJSON());
    this.$el.html(this.template(this.collection.toJSON()));
    return this;
  }
});
