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
        expect(new Zaphod.Card({ id: 1, front: '' }).isValid()).toBe(false);
      });
    });

    describe('without back text', function() {
      it('is valid', function() {
        expect(new Zaphod.Card({ id: 1, back: '' }).isValid()).toBe(true);
      });
    });
  });
});
