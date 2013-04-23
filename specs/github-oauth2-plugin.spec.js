describe('github-oauth2-plugin -> ', function(){

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user')
    , github_oauth2_plugin = require('../lib/github-oauth2-plugin');

  userSchema.plugin(github_oauth2_plugin);
  var GitHubModel = mongoose.model('GitHubModel', userSchema);

  var _json = {
    id: 'id',
    login: 'login',
    email: 'email',
    name: 'name',
    html_url: 'link',
    avatar_url: 'picture'
  };

  GitHubModel.remove({},function(){});

  it('should have an auth_type_github property', function(){
    var u = new GitHubModel({auth_type_github: {}});
    expect(u.auth_type_github).not.toBeUndefined();
  });

  it('should have an auth_type_github.id property', function(){
    expect(userSchema.paths['auth_type_github.id']).not.toBeUndefined();
  });

  it('should have an auth_type_github.username property', function(){
    expect(userSchema.paths['auth_type_github.username']).not.toBeUndefined();
  });

  it('should have an auth_type_github.link property', function(){
    expect(userSchema.paths['auth_type_github.link']).not.toBeUndefined();
  });

  it('should have an auth_type_github.picture property', function(){
    expect(userSchema.paths['auth_type_github.picture']).not.toBeUndefined();
  });

  it('should have an auth_type_github.oauth_access_token property', function(){
    expect(userSchema.paths['auth_type_github.oauth_access_token']).not.toBeUndefined();
  });

  it('should have an auth_type_github.oauth_refresh_token property', function(){
    expect(userSchema.paths['auth_type_github.oauth_refresh_token']).not.toBeUndefined();
  });

  it('should set properties from the github json response', function(){
    var u = new GitHubModel();
    u.setGitHubAttr(_json, 'access_token', 'refresh_token');
    expect(u.auth_type_github.id).toBe('id');
    expect(u.auth_type_github.username).toBe('login');
    expect(u.auth_type_github.link).toBe('link');
    expect(u.auth_type_github.picture).toBe('picture');
    expect(u.auth_type_github.oauth_access_token).toBe('access_token');
    expect(u.auth_type_github.oauth_refresh_token).toBe('refresh_token');

    expect(u.auth_provider).toBe('github');
    expect(u.uid).toBe('_github_' + 'id');
    expect(u.email).toBe('email');
  });

  it('should have a static findOrCreateGitHubUser function', function(){
    expect(typeof GitHubModel.findOrCreateGitHubUser).toBe('function');
  });

  it('should findOrCreateGitHubUser', function(done) {
    var profile = {
      id: 'github',
      _json: _json
    };
    GitHubModel.findOrCreateGitHubUser('a', 'b', profile, function(err, user) {
      expect(err).toBeNull();
      expect(user.auth_type_github.id).toBe('id');
      expect(user.uid).toBe('_github_id');
      done();
    });
  });

});