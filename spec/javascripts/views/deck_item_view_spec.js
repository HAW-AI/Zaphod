describe('DeckItemView', function() {
  beforeEach(function() {
    this.deck = new Zaphod.Deck({ id: 1 });
    this.view = new Zaphod.DeckItemView({ model: this.deck });
  });

  describe('save',function() {
    it('tries to save the model with new data', function() {
      spyOn(this.deck, 'save');

      this.view.render();
      this.view.$('.title').val('new title');
      this.view.save();

      expect(this.deck.save).toHaveBeenCalledWith({
        title: 'new title',
        description: this.deck.get('description')
      });
    });
  });
});
