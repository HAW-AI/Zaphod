var Zaphod = {
  // don't create namespaces Models/Views/Collections for simplicity
  // but name the classes Card/CardView/Cards instead

  router: null,
  currentUser: {
    authToken: 'valid_auth_token4'
  },


  // valid options: model, id
  // or [{model, id}]
  urlFor: function(options) {
    if (!_.isArray(options)) {
      options = [options];
    }

    var url = '';

    _(options).each(function(opts) {
      url += '/' + opts.modelName + 's';
      if (opts.id) url += '/' + opts.id;
    });

    url += '.json?auth_token=' + Zaphod.currentUser.authToken;

    return url;
  }
};

(function($) {
  $(document).ready(function() {
    Zaphod.router = new Zaphod.Router();
    Backbone.history.start({ pushState: true });
  });
})(jQuery);