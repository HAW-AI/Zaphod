describe('CardsView', function() {
  beforeEach(function() {
    this.cards = new Zaphod.Cards();
    this.view = new Zaphod.CardsView({ collection: this.cards, el: $('<div/>') });
  });

  describe('createCard', function() {
    it('creates a new card and adds it to the client-side collection', function() {
      spyOn(this.cards, 'add');
      this.view.createCard();
      expect(this.cards.add).toHaveBeenCalled();
      expect(this.cards.add.mostRecentCall.args[0].isNew()).toBe(true);
    });
  });
});
