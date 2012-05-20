describe('CardView', function() {
  beforeEach(function() {
    this.card = new Zaphod.Card({ deckId: 1, front: 'front', back: 'back' });
    this.view = new Zaphod.CardView({ model: this.card, el: $('<div/>') });
  });

  describe('save',function() {
    it('tries to save the model with new data', function() {
      spyOn(this.card, 'save');

      this.view.render();
      this.view.$('.front').val('new front');
      this.view.save();

      expect(this.card.save).toHaveBeenCalledWith({ front: 'new front', back: 'back' });
    });
  });
});
