module.exports = exports = function google_oauth2_plugin (schema, options) {

  schema.add({
    auth_type_google: {
      id: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String},
      oauth_token: {type: String},
      oauth_token_secret: {type: String}
    }
  });

  schema.methods.setGoogleAttr = function(_json, token, tokenSecret) {
    this.set({
      'auth_provider': 'google',
      'uid': '_google_' + _json.id,
      'email': _json.email,
      'display_name': _json.given_name,
      'auth_type_google.id': _json.id,
      'auth_type_google.username': _json.email,
      'auth_type_google.link': _json.link,
      'auth_type_google.picture': _json.picture,
      'auth_type_google.oauth_token': token,
      'auth_type_google.oauth_token_secret': tokenSecret
    });
  };

  schema.static('findOrCreateGoogleUser', function (token, tokenSecret, profile, done) {
    var User = this;
    User.findOne({ 'auth_type_google.id': profile.id }, function(err, user){
      if (err) { return done(err); }

      if (user) {
        return done(null, user);
      } else {
        var j = profile._json;
        var gUser = new User();
        gUser.setGoogleAttr(j, token, tokenSecret);
        gUser.save(function(err, user){
          if (err) {return done(err);}
          return done(null, user);
        });
      }

    });
  });

};