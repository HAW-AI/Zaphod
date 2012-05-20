describe('LearnView', function() {
  beforeEach(function() {
    this.deck = new Zaphod.Deck({ id: 1 });
    this.view = new Zaphod.LearnView({ deck: this.deck });
    this.view.card = new Zaphod.Card({ id: 1 });
    this.card = this.view.card;

    this.addMatchers({
      toIncludeSubstring: function(str) {
        return this.actual.indexOf(str) !== -1;
      }
    });
  });

  describe('next', function() {
    var options;

    it('does an ajax call', function() {
      spyOn($, 'ajax');
      this.view.next();
      expect($.ajax).toHaveBeenCalled();

      options = $.ajax.argsForCall[0][0];
    });

    describe('ajax options', function() {
      it('does a GET request', function() {
        expect(options.type).toBe('GET');
      });

      it('uses a special learning url', function() {
        var url = this.deck.url() + '/cards/next';
        expect(options.url).toIncludeSubstring(url);
      });
    });
  });

  _.each(['known', 'unknown'], function(event) {
    describe(event, function() {
      var options;

      it('does an ajax call', function() {
        spyOn($, 'ajax');
        this.view[event]();
        expect($.ajax).toHaveBeenCalled();

        options = $.ajax.argsForCall[0][0];
      });

      describe('ajax options', function() {
        it('does a PUT request', function() {
          expect(options.type).toBe('PUT');
        });

        it('sends event=' + event, function() {
          expect(JSON.parse(options.data).event).toBe(event);
        });

        it('uses the resource url of the card', function() {
          var url = new Zaphod.Card({ id: this.card.id }).url();
          expect(options.url).toIncludeSubstring(url);
        });
      });
    });
  });
});
