module.exports = exports = function twitter_oauth1a_plugin (schema, options) {

  schema.add({
    auth_type_twitter: {
      id: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String},
      oauth_token: {type: String},
      oauth_token_secret: {type: String}
    }
  });

  schema.methods.setTwitterAttr = function(_json, token, tokenSecret) {
    this.set({
      'auth_provider': 'twitter',
      'uid': '_twitter_' + _json.id_str,
      'email': null,
      'display_name': _json.name,
      'auth_type_twitter.id': _json.id_str,
      'auth_type_twitter.username': _json.screen_name,
      'auth_type_twitter.link': 'http://twitter.com/' + _json.screen_name,
      'auth_type_twitter.picture': _json.profile_image_url,
      'auth_type_twitter.oauth_token': token,
      'auth_type_twitter.oauth_token_secret': tokenSecret
    });
  };

  schema.static('findOrCreateTwitterUser', function (token, tokenSecret, profile, done) {
    var User = this;
    User.findOne({ 'auth_type_twitter.id': profile.id }, function (err, user) {
      if (err) {return done(err);}

      if (user) {
        return done(null, user);
      } else {
        var j = profile._json;
        var twitterUser = new User();
        twitterUser.setTwitterAttr(j, token, tokenSecret);
        twitterUser.save(function(err, user) {
          if (err) {return done(err);}
          return done(null, user);
        });
      }

    });
  });

};