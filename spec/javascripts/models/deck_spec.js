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

  describe('collaborators', function() {
    it('should have at least an owner', function() {
      var deck = new Zaphod.Deck({ id: 1 });
      deck.fetch({ async: false });
      var collabs = deck.collaborators();
      expect(collabs).not.toBeEmpty();
      expect(_.find(collabs, function(c) { return c.role === 'owner' })).not.toBeUndefined();
    });
  });
});
