describe('google-oauth2-plugin -> ', function(){

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user')
    , google_oauth2_plugin = require('../lib/google-oauth2-plugin');

  userSchema.plugin(google_oauth2_plugin);
  var GoogleModel = mongoose.model('GoogleModel', userSchema);

  var _json = {
    id: 'id',
    email: 'email',
    given_name: 'given_name',
    link: 'link',
    picture: 'picture'
  };

  GoogleModel.remove({},function(){});

  it('should have an auth_type_google property', function(){
    var u = new GoogleModel({auth_type_google: {}});
    expect(u.auth_type_google).not.toBeUndefined();
  });

  it('should have an auth_type_google.id property', function(){
    expect(userSchema.paths['auth_type_google.id']).not.toBeUndefined();
  });

  it('should have an auth_type_google.username property', function(){
    expect(userSchema.paths['auth_type_google.username']).not.toBeUndefined();
  });

  it('should have an auth_type_google.link property', function(){
    expect(userSchema.paths['auth_type_google.link']).not.toBeUndefined();
  });

  it('should have an auth_type_google.picture property', function(){
    expect(userSchema.paths['auth_type_google.picture']).not.toBeUndefined();
  });

  it('should have an auth_type_google.oauth_token property', function(){
    expect(userSchema.paths['auth_type_google.oauth_token']).not.toBeUndefined();
  });

  it('should have an auth_type_google.oauth_token_secret property', function(){
    expect(userSchema.paths['auth_type_google.oauth_token_secret']).not.toBeUndefined();
  });

  it('should set properties from the google json response', function(){
    var u = new GoogleModel();
    u.setGoogleAttr(_json, 'token', 'tokenSecret');
    expect(u.auth_type_google.id).toBe('id');
    expect(u.auth_type_google.username).toBe('email');
    expect(u.auth_type_google.link).toBe('link');
    expect(u.auth_type_google.picture).toBe('picture');
    expect(u.auth_type_google.oauth_token).toBe('token');
    expect(u.auth_type_google.oauth_token_secret).toBe('tokenSecret');

    expect(u.auth_provider).toBe('google');
    expect(u.uid).toBe('_google_' + 'id');
    expect(u.email).toBe('email');
  });

  it('should have a static findOrCreateGoogleUser function', function(){
    expect(typeof GoogleModel.findOrCreateGoogleUser).toBe('function');
  });

  it('should findOrCreateGoogleUser', function(done) {
    var profile = {
      id: 'google',
      _json: _json
    };
    GoogleModel.findOrCreateGoogleUser('a', 'b', profile, function(err, user) {
      expect(err).toBeNull();
      expect(user.auth_type_google.id).toBe('id');
      expect(user.uid).toBe('_google_id');
      done();
    });
  });

});