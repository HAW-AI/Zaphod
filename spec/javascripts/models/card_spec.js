describe('Card', function() {
  describe('without front text', function() {
    it('is invalid', function() {
      expect(new Zaphod.Card({ front: '' }).isValid()).toBe(false);
    });
  });

  describe('without back text', function() {
    it('is valid', function() {
      expect(new Zaphod.Card({ back: '' }).isValid()).toBe(true);
    });
  });
});