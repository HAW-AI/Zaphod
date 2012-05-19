Zaphod.DecksView = Backbone.View.extend({
  template: JST['decks'],

  initialize: function() {
    _.bindAll(this, 'render');

    // render to be able to add
    this.render();

    this.collection.bind('add reset remove', this.render);
  },

  render: function() {
    console.log(this.collection.invoke('toJSON'))
    var data = { decks: this.collection.invoke('toJSON') };
    this.$el.html(this.template(data, this._helpers));
    return this;
  },

  _helpers: {  
    link_to: function(txt) {
      console.log(arguments)
      var str = '<a href="' + this.collection.get(obj.id) + '">"' + txt + '</a>';
      return new Handlebars.SafeString(str);
    }
  }
});
