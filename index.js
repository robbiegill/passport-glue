var version = require('./package').version
  , auth_type = require('./lib/auth-type-plugin')
  , github = require('./lib/github-oauth2-plugin')
  , google = require('./lib/google-oauth2-plugin')
  , twitter = require('./lib/twitter-oauth1a-plugin')
  , local = require('./lib/local-auth-plugin')
  , sessions = require('./lib/persistent-sessions-plugin')
  , userSchema = require('./lib/user');

module.exports.version = version;
module.exports.auth_type_plugin = auth_type;
module.exports.github_oauth2_plugin = github;
module.exports.google_oauth2_plugin = google;
module.exports.twitter_oauth1a_plugin = twitter;
module.exports.local_auth_plugin = local;
module.exports.persistent_sessions_plugin = sessions;
module.exports.userSchema = userSchema;