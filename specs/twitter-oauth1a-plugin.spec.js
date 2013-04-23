describe('twitter-oauth2-plugin -> ', function(){

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user')
    , twitter_oauth2_plugin = require('../lib/twitter-oauth1a-plugin');

  userSchema.plugin(twitter_oauth2_plugin);
  var TwitterModel = mongoose.model('TwitterModel', userSchema);

  var _json = {
    id_str: 'id',
    screen_name: 'login',
    name: 'name',
    profile_image_url: 'picture'
  };

  TwitterModel.remove({},function(){});


  it('should have an auth_type_twitter property', function(){
    var u = new TwitterModel({auth_type_twitter: {}});
    expect(u.auth_type_twitter).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.id property', function(){
    expect(userSchema.paths['auth_type_twitter.id']).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.username property', function(){
    expect(userSchema.paths['auth_type_twitter.username']).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.link property', function(){
    expect(userSchema.paths['auth_type_twitter.link']).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.picture property', function(){
    expect(userSchema.paths['auth_type_twitter.picture']).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.oauth_token property', function(){
    expect(userSchema.paths['auth_type_twitter.oauth_token']).not.toBeUndefined();
  });

  it('should have an auth_type_twitter.oauth_token_secret property', function(){
    expect(userSchema.paths['auth_type_twitter.oauth_token_secret']).not.toBeUndefined();
  });

  it('should set properties from the twitter json response', function(){
    var u = new TwitterModel();
    u.setTwitterAttr(_json, 'token', 'tokenSecret');
    expect(u.auth_type_twitter.id).toBe('id');
    expect(u.auth_type_twitter.username).toBe('login');
    expect(u.auth_type_twitter.link).toBe('http://twitter.com/' + 'login');
    expect(u.auth_type_twitter.picture).toBe('picture');
    expect(u.auth_type_twitter.oauth_token).toBe('token');
    expect(u.auth_type_twitter.oauth_token_secret).toBe('tokenSecret');

    expect(u.auth_provider).toBe('twitter');
    expect(u.uid).toBe('_twitter_' + 'id');
    expect(u.email).toBeNull();
  });

  it('should have a static findOrCreateTwitterUser function', function(){
    expect(typeof TwitterModel.findOrCreateTwitterUser).toBe('function');
  });

  it('should findOrCreateTwitterUser', function(done) {
    var profile = {
      id: 'twitter',
      _json: _json
    };
    TwitterModel.findOrCreateTwitterUser('a', 'b', profile, function(err, user) {
      expect(err).toBeNull();
      expect(user.auth_type_twitter.id).toBe('id');
      expect(user.uid).toBe('_twitter_id');
      done();
    });
  });

});