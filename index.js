var version = require('./package').version
  , userSchema = require('./lib/user')
  , github = require('./lib/github-oauth2-plugin')
  , google = require('./lib/google-oauth2-plugin')
  , twitter = require('./lib/twitter-oauth1a-plugin')
  , local = require('./lib/local-auth-plugin')
  , sessions = require('./lib/persistent-sessions-plugin');

module.exports.version = version;
module.exports.userSchema = userSchema;
module.exports.github_oauth2_plugin = github;
module.exports.google_oauth2_plugin = google;
module.exports.twitter_oauth1a_plugin = twitter;
module.exports.local_auth_plugin = local;
module.exports.persistent_sessions_plugin = sessions;