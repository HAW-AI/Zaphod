(function($) {

  $(document).ready(function() {
    $('#content').text('hello world');


    var Card = Backbone.Model.extend({
      defaults: {
        front: 'the front',
        back: 'the back'
      },

      url: function() {
        return '/cards/' + this.get('id') + '.json?auth_token=valid_auth_token4';
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


    var Router = Backbone.Router.extend({
      routes: {
        '': 'getCard',
        'cards/:id': 'getCard'
      },

      getCard: function(id) {
        id = id || 1;
        var model = new Card({ id: id });
        model.fetch();
        var view = new CardView({ model: model, el: $('#content') });
      }
    });

    var router = new Router();

    Backbone.history.start({ pushState: true });

    //router.navigate('cards/1', { trigger: true });

  });

})(jQuery);
