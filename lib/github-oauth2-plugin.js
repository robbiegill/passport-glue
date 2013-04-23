module.exports = exports = function github_oauth2_plugin (schema, options) {

  schema.add({
    auth_type_github: {
      id: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String},
      oauth_access_token: {type: String},
      oauth_refresh_token: {type: String}
    }
  });

  schema.methods.setGitHubAttr = function(_json, accessToken, refreshToken) {
    this.set({
      'auth_provider': 'github',
      'uid': '_github_' + _json.id,
      'email': _json.email,
      'display_name': _json.name,
      'auth_type_github.id': _json.id,
      'auth_type_github.username': _json.login,
      'auth_type_github.link': _json.html_url,
      'auth_type_github.picture': _json.avatar_url,
      'auth_type_github.oauth_access_token': accessToken,
      'auth_type_github.oauth_refresh_token': refreshToken
    });
  };

  schema.static('findOrCreateGitHubUser', function (accessToken, refreshToken, profile, done) {
    var User = this;
    User.findOne({ 'auth_type_github.id': profile.id }, function (err, user) {
      if (err) {return done(err);}

      if (user) {
        return done(null, user);
      } else {
        var j = profile._json;
        var githubUser = new User();
        githubUser.setGitHubAttr(j, accessToken, refreshToken);
        githubUser.save(function(err, user) {
          if (err) {return done(err);}
          return done(null, user);
        });
      }

    });
  });

};