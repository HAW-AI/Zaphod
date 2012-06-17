(function($) {
	Zaphod.router = new Zaphod.Router();
	Zaphod.currentUser = new Zaphod.CurrentUser();
  Zaphod.currentUserView = null;

  $(document).ready(function() {
    Zaphod.currentUserView = new Zaphod.CurrentUserView({ model: Zaphod.currentUser, el: $('#current_user') });
    Zaphod.currentUserView.render();

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
