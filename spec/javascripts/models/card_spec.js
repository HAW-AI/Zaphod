describe('Card', function() {
  var card;

  beforeEach(function() {
  	card = new Zaphod.Card();
  });

  describe('without front text', function() {
    it('is invalid', function() {
      var spy = jasmine.createSpy();
      card.bind('error', spy);
      card.set({ front: '' });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('without back text', function() {
    it('is valid', function() {
      var spy = jasmine.createSpy();
      card.bind('error', spy);
      card.set({ back: '' });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});