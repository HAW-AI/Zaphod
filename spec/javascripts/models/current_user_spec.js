describe('CurrentUser', function() {
  beforeEach(function() {
    this.currentUser = new Zaphod.CurrentUser();
  });

  it('is not logged in by default', function() {
    expect(this.currentUser.get('isLoggedIn')).toBe(false);
  });

  describe('isNew', function() {
    it('is new when the user is logged out', function() {
      expect(this.currentUser.isNew()).toBe(true);
    });

    it('is not new when the user is logged in', function() {
      this.currentUser.set('isLoggedIn', true);
      expect(this.currentUser.isNew()).toBe(false);
    });
  });

  describe('delete', function() {
    it('logs the user out', function() {
      spyOn($, 'ajax');

      this.currentUser.set({
        email: 'example@example.com',
        password: 'foo',
        isLoggedIn: true // is set when server responds with user obj
      });
      this.currentUser.destroy();

      expect($.ajax).toHaveBeenCalled();
      var options = $.ajax.mostRecentCall.args[0];
      expect(options.type).toBe('DELETE');
    });

    it('does nothing when the user is not logged in', function() {
      spyOn($, 'ajax');
      this.currentUser.destroy();
      expect($.ajax).not.toHaveBeenCalled();
    });
  });
});
