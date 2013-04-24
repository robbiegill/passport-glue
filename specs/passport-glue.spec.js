describe('passport-glue -> ', function() {
  var ppu = require('../index');

  it('should have a version number', function() {
    expect(ppu.version).not.toBeUndefined();
  });

  it('should have a userSchema', function() {
    expect(ppu.userSchema).not.toBeUndefined();
  });

  it('should have a google_oauth2_plugin', function() {
    expect(typeof ppu.google_oauth2_plugin).toBe('function');
  });

  it('should have a github_oauth2_plugin', function() {
    expect(typeof ppu.github_oauth2_plugin).toBe('function');
  });

  it('should have a twitter_oauth1a_plugin', function() {
    expect(typeof ppu.twitter_oauth1a_plugin).toBe('function');
  });

  it('should have a local_auth_plugin', function() {
    expect(typeof ppu.local_auth_plugin).toBe('function');
  });

  it('should have a auth_type_plugin', function() {
    expect(typeof ppu.auth_type_plugin).toBe('function');
  });

});