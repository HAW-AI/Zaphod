describe('Cards', function() {
  describe('initialize', function() {
    it('needs options with a deck id', function() {
      expect(function() { new Zaphod.Cards({ deckId: 1337 }); }).not.toThrow();
      expect(function() { new Zaphod.Cards(); }).toThrow();
    });

    it('optionally takes models', function() {
      var models = [ new Zaphod.Card(), new Zaphod.Card() ];
      var cards;
      expect(function() { cards = new Zaphod.Cards(models); }).toThrow();
      expect(function() { cards = new Zaphod.Cards(models, { deckId: 1337 }); }).not.toThrow();
      expect(cards.size()).toBe(2);
    });

    it('throws without models or options with deckId', function() {
      expect(function() { new Zaphod.Cards({}); }).toThrow();
      expect(function() { new Zaphod.Cards(); }).toThrow();
    });
  });
});
