describe('User', function() {
  describe('validate', function() {
    it('needs a name', function() {
      expect(new Zaphod.User({})).toBeInvalid();
      expect(new Zaphod.User({ name: "" })).toBeInvalid();
      expect(new Zaphod.User({ name: "foo" })).toBeValid();
    });
  });
});
