describe('DecksView', function() {
  beforeEach(function() {
    this.collection = new Zaphod.Decks();
    this.view = new Zaphod.DecksView({ collection: this.collection });
  });

  describe('createDeck', function() {
    it('creates a new deck locally', function() {
      expect(this.collection.size()).toBe(0);
      this.view.createDeck();
      expect(this.collection.size()).toBe(1);
    });
  });
});
