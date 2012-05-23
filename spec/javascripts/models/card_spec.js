describe('Card', function() {
  describe('initialize', function() {
    describe('without options.id or options.deckId', function() {
      it('throws', function() {
        expect(function() { new Zaphod.Card(); }).toThrow();
      });
    });

    describe('with options.id or options.deckId', function() {
      it('doesnt throw', function() {
        expect(function() { new Zaphod.Card({ id: 1 }); }).not.toThrow();
        expect(function() { new Zaphod.Card({ deckId: 1 }); }).not.toThrow();
      });
    });

    describe('with both options.id and options.deckId', function() {
      it('throws', function() {
        expect(function() { new Zaphod.Card({ id: 1, deckId: 1 }); }).toThrow();
      });
    });
  });

  describe('validations', function() {
    describe('without front text', function() {
      it('is invalid', function() {
        expect(new Zaphod.Card({ id: 1, front: '' })).toBeInvalid();
      });
    });

    describe('without back text', function() {
      it('is valid', function() {
        expect(new Zaphod.Card({ id: 1, back: '' })).toBeValid();
      });
    });
  });

  describe('save', function() {
    beforeEach(function() {
      this.deck = new Zaphod.Deck();
      this.deck.save({}, { async: false });
      this.card = new Zaphod.Card({ deckId: this.deck.get('id') });
    });

    afterEach(function() {
      this.deck.destroy();
    });

    describe('with a new card', function() {
      it('saves it to the nested /decks/:deckId/cards path', function() {
        spyOn($, 'ajax');
        this.card.save();
        expect($.ajax).toHaveBeenCalled();
        var url = this.deck.url() + '/cards';
        expect($.ajax.mostRecentCall.args[0].url).toIncludeSubstring(url);
      });
    });

    describe('with an existing card', function() {
      beforeEach(function() {
        this.card.save({}, { async: false });
      });

      afterEach(function() {
        this.card.destroy();
      });

      it('saves it to the flat /cards/:id path', function() {
        spyOn($, 'ajax');
        this.card.save();
        expect($.ajax).toHaveBeenCalled();
        var url = '/cards/' + this.card.get('id');
        expect($.ajax.mostRecentCall.args[0].url).toIncludeSubstring(url);
      });
    });
  });
});
