var Zaphod = {
  // don't create namespaces Models/Views/Collections for simplicity
  // but name the classes Card/CardView/Cards instead

  router: null,
  currentUser: {
    authToken: 'valid_auth_token2'
  },

  apiUrl: function(url) {
    // add .json and auth_token
    return url + '.json?auth_token=' + Zaphod.currentUser.get('authToken');
  }
};

var backboneSync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options = _.clone(options) || {};

  if (!options.url && model.url) {
    var url = _.isFunction(model.url) ? model.url() : model.url;
    options.url = Zaphod.apiUrl(url);
  }

  // dont cache until issue is resolved where data is shown even though the user
  // is signed out
  options.cache = false;

  return backboneSync(method, model, options);
};

(function($) {
  $(document).ready(function() {
    Zaphod.router = new Zaphod.Router();

    Zaphod.currentUser = new Zaphod.CurrentUser();
    new Zaphod.CurrentUserView({ model: Zaphod.currentUser, el: $('#current_user') }).render();

    // re-trigger current route to make use of new privileges
    //Zaphod.currentUser.bind('change', function() {
    //  var frag = Backbone.history.fragment;
    //  Backbone.history.fragment =
    //    'random string to force the router to re-trigger the current route';
    //  Zaphod.router.navigate(frag, { trigger: true, replace: true });
    //});

    // prevent links from making a big request
    $(document).on('click', 'a', function (ev) {
      var href = $(this).attr('href');
      ev.preventDefault();
      Zaphod.router.navigate(href, true);
    });

    Backbone.history.start({ pushState: true });
  });
})(jQuery);
