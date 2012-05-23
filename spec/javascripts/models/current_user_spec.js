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

  describe('localStorage', function() {
    describe('with saved user state', function() {
      beforeEach(function() {
        this.currentUser.set({
          name: 'hans',
          authToken: 'an_auth_token',
          isLoggedIn: true
        });

        localStorage.currentUser = JSON.stringify(this.currentUser.toJSON());
      });

      describe('initialize', function() {
        it('loads the current user from the saved state', function() {
          expect(new Zaphod.CurrentUser().toJSON()).toBeEqualTo(this.currentUser.toJSON());
        });

        it('doesnt load the saved state if its passed custom init data', function() {
          var data = { name: 'peter' };
          expect(new Zaphod.CurrentUser(data).toJSON()).not.toBeEqualTo(this.currentUser.toJSON());
        });
      });

      describe('save', function() {
        beforeEach(function() {
          this.localStorageBackup = localStorage.currentUser;
          localStorage.removeItem('currentUser');
        });

        afterEach(function() {
          localStorage.currentUser = this.localStorageBackup;
        });

        // hard to test because the logic is in parse() which is called when
        // the server responds
        //
        //it('saves the current user state in localStorage', function() {
        //  expect(localStorage.currentUser).toBe(undefined);
        //  this.currentUser.save();
        //  expect(localStorage.currentUser).not.toBe(undefined);
        //  expect(JSON.parse(localStorage.currentUser)).toBeEqualTo(this.currentUser.toJSON());
        //});
      });
      
      describe('destroy', function() {
        it('removes the saved state from localStorage', function() {
          this.currentUser.destroy();
          expect(localStorage.currentUser).toBe(undefined);
        });
      });
    });
  });
});
