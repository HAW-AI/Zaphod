Zaphod.CurrentUser = Backbone.Model.extend({
  defaults: {
    name: 'Guest',
    email: 'example@example.com',
    password: '', // will only be stored until sent to the server
    authToken: '',
    isLoggedIn: false
  },

  initialize: function() {
    // load from localStorage if customizations are requested
    if (_.isEqual(this.defaults, this.attributes) && localStorage.currentUser) {
      this.set(JSON.parse(localStorage.currentUser));
    }
  },


  url: '/current_user',

  // changing and then saving results in creating i.e. logging in
  sync: function(method, model, options) {
    if (method === 'update') {
      method = 'create'
    }

    Backbone.sync(method, model, options);

    if (method === 'create') {
      this.set('password', '');
    } else if (method === 'delete') {
      // restore guest account on logout
      this.set(this.defaults);
      localStorage.removeItem('currentUser');
    }
  },

  parse: function(user) {
    var obj = {
      name: user.username,
      email: user.email,
      password: '',
      authToken: user.authentication_token,
      isLoggedIn: true
    };

    // successful login
    localStorage.currentUser = JSON.stringify(obj);

    return obj;
  },

  isNew: function() {
    return !this.get('isLoggedIn');
  }
});
