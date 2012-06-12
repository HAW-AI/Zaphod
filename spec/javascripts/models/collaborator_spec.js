describe('Collaborator', function() {
  describe('validate', function() {
    it('needs valid user object and a role', function() {
      var invalidUser = new Zaphod.User();
      var validUser = new Zaphod.User({ name: 'foo' });
      var invalidRole = 'foo';
      var validRole = 'editor';

      expect(new Zaphod.Collaborator({})).toBeInvalid();
      expect(new Zaphod.Collaborator({ user: validUser })).toBeInvalid();
      expect(new Zaphod.Collaborator({ role: validRole })).toBeInvalid();
      expect(new Zaphod.Collaborator({ user: invalidUser, role: validRole })).toBeInvalid();
      expect(new Zaphod.Collaborator({ user: validUser, role: invalidRole })).toBeInvalid();
      expect(new Zaphod.Collaborator({ user: invalidUser, role: invalidRole })).toBeInvalid();
      expect(new Zaphod.Collaborator({ user: validUser, role: validRole })).toBeValid();
    });
  });
});
