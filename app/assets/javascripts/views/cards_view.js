Zaphod.CardsView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render', 'add');
    this.collection.bind('add', this.add);
  },

  add: function(card) {
    var view = new Zaphod.CardView({ model: card, el: $('<div></div>') });
    console.log($(this.el))
    this.$el.append(view.render().el)
  },

  render: function() {
    //this.$el.html(this.template(this.model.toJSON()));
    this.$el.html("COLLECTION");
    return this;
  }
});
