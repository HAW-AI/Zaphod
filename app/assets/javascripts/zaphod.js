var Zaphod = {
  // don't create namespaces Models/Views/Collections for simplicity
  // but name the classes Card/CardView/Cards instead

  router: null,
  currentUser: {
    authToken: 'valid_auth_token4'
  }
};

(function($) {
  var backboneSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    options = _.clone(options)

    // add .json to URIs for GET requests
    if (method == 'read' && !options.url && model.url) {
      var url = _.isFunction(model.url) ? model.url() : model.url;
      options.url = url + '.json';
    }

    // send auth token
    options.data = options.data ? _.clone(options.data) : {};
    options.data = _.extend(options.data, { auth_token: Zaphod.currentUser.authToken });

    return backboneSync(method, model, options);
  };

  $(document).ready(function() {
    Zaphod.router = new Zaphod.Router();
    Backbone.history.start({ pushState: true });
  });
})(jQuery);
