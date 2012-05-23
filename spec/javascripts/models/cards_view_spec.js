describe('CardsView', function() {
  beforeEach(function() {
    this.cards = new Zaphod.Cards({ deckId: 1 });
    this.view = new Zaphod.CardsView({ collection: this.cards, el: $('<div/>') });
  });

  describe('createCard', function() {
    beforeEach(function() {
      spyOn(this.cards, 'add');
      this.view.createCard();
      this.createdCard = this.cards.add.mostRecentCall.args[0];
    });

    it('creates adds a new card to the client-side collection', function() {
      expect(this.createdCard.isNew()).toBe(true);
    });

    it('uses the deck_id of the collection', function() {
      console.log('cards.deckId: ' + this.cards.get('deckId'))
      console.log('createdCard.deckId: ' + this.createdCard.get('deckId'))
      expect(this.createdCard.get('deckId')).toBe(this.cards.deckId());
    });
  });
});
