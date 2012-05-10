(function($) {

  $(document).ready(function() {
    $('#content').text('hello world');

    var auth_token = 'valid_auth_token4';

    // valid options: model, id
    // or [{model, id}]
    var urlFor = function(options) {
      if (!_.isArray(options)) {
        options = [options];
      }

      var url = '';

      _(options).each(function(opts) {
        url += '/' + opts.modelName + 's';
        if (opts.id) url += '/' + opts.id;
      });

      url += '.json?auth_token=' + auth_token;

      return url;
    };

    var Card = Backbone.Model.extend({
      defaults: {
        front: 'the front',
        back: 'the back'
      },

      url: function() {
        return urlFor({ modelName: 'card', id: this.get('id') });
      }
    
      });

    var CardView = Backbone.View.extend({
      className: 'Card',
      template: JST['templates/card'],

      initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
      },

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }
    });

    var CardCollection = Backbone.Collection.extend({
      model: Card,

      url: function() {
        return urlFor([{ modelName: 'deck', id: 1 }, { modelName: 'card' }]);
      }
    });

    var CardCollectionView = Backbone.View.extend({
      className: 'CardCollection',
      template: JST['templates/cards'],

      initialize: function() {
        _.bindAll(this, 'render', 'add');
        var collection = new CardCollection();
        collection.bind('add', this.add);
        collection.fetch({ add: true });
      },

      add: function(card) {
        var view = new CardView({ model: card, el: $('<div></div>') });
        console.log($(this.el))
        $(this.el).append(view.render().el)
      },

      render: function() {
        //$(this.el).html(this.template(this.model.toJSON()));
        $(this.el).html("COLLECTION");
        return this;
      }
    });


    var Router = Backbone.Router.extend({
      routes: {
        '': 'getCard',
        'cards/:id': 'getCard',
        'decks/:id/cards': 'getCards'
      },

      getCard: function(id) {
        id = id || 1;
        var model = new Card({ id: id });
        model.fetch();
        var view = new CardView({ model: model, el: $('#content') });
      },

      getCards: function(deckId) {
        new CardCollectionView({ el: $('#content') });
      }
    });

    var router = new Router();

    Backbone.history.start({ pushState: true });

    //router.navigate('cards/1', { trigger: true });

  });

})(jQuery);
