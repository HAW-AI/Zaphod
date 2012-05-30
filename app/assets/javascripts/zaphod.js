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
