var Zaphod = {
  // don't create namespaces Models/Views/Collections for simplicity
  // but name the classes Card/CardView/Cards instead

  router: null,
  currentUser: {
    authToken: 'valid_auth_token4'
  },


  // takes a {modelName, id}
  // if a model is the child of a parent object call the function with both
  // urlFor({modelName: parentName, id}, {modelName: childName, id})
  urlFor: function(options) {
    var url = '';

    _(arguments).each(function(opts) {
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