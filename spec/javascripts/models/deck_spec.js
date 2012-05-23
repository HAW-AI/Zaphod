describe('Deck', function() {
  describe('validate', function() {
    it('is valid only if it has a title', function() {
      expect(new Zaphod.Deck({ id: 1, title: 'hi' })).toBeValid();
      expect(new Zaphod.Deck({ id: 1, title: '' })).toBeInvalid();
      expect(new Zaphod.Deck({ id: 1, title: '', description: 'hi' })).toBeInvalid();
    });

    it('has sane defaults do be valid right after creation', function() {
      expect(new Zaphod.Deck({ id: 1 })).toBeValid();
    });
  });
});
