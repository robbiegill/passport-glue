# passport-glue [![Build Status](https://travis-ci.org/robbiegill/passport-glue.png?branch=master)](https://travis-ci.org/robbiegill/passport-glue)
All the glue you need for integrating Passport, Express, and Mongoose.

Passport provides everything you need to use oauth or other authorization methods with Google, GitHub, Twitter, and loads more.
Glue plugins give your Mongoose models keys and methods to find or create users 
from authentication provider responses and to (de)serialize users for persistent sessions. 
Simultaneously support multiple authentication providers, just add the plugin for each provider you want to use.

Glue currently supports:
 - persistent sessions
 - Passport
    - passport-github
    - passport-google-oauth (oauth2)
    - passport-twitter

More to come...


## How to

### Setup your user model with GitHub authorization and persistent sessions
Glue provides the keys for authentication type and attributes provided by an authentication provider. 
Use the provided base schema (as below) or plugin `glue.auth_provider_type` and 1 or more provider plugins to your Mongoose schema. 

```js
  var glue = require('passport-glue');
  
  var userSchema = glue.userSchema;
  userSchema.plugin(glue.github_oauth2_plugin);
  userSchema.plugin(glue.persistent_sessions_plugin);
  mongoose.model('User', userSchema);
```    
### passport.use GitHub Strategy
Glue provides the static findOrCreateGitHubUser function.

```js
  passport.use(new GitHubStrategy({
      clientID: config.authGitHub.ID,
      clientSecret: config.authGitHub.SECRET,
      callbackURL: config.authGitHub.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreateGitHubUser(accessToken, refreshToken, profile, done);
    }
  ));
```    
### Persistent sessions
Glue provides the static serialize and deserialize functions for restoring user sessions from cookies.
```js
  passport.serializeUser(function (user, done) {
    User.serializeUser(user, done);
  });
  
  passport.deserializeUser(function (obj, done) {
    User.deserializeUser(obj, done);
  });
```    
### Express and Passport sessions
```js
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'my secret' }));
  app.use(passport.initialize());
  app.use(passport.session());
```  
### Add Google 
Glue provides the static findOrCreateGoogleUser function.
```js
  userSchema.plugin(glue.google_oauth2_plugin)

  passport.use(new GoogleStrategy({
      clientID: config.authGoogle.ID,
      clientSecret: config.authGoogle.SECRET,
      callbackURL: config.authGoogle.callbackURL
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreateGoogleUser(token, tokenSecret, profile, done);
    }
  ));
```
### Add Twitter 
Glue provides the static findOrCreateTwitterUser function.
```js
  userSchema.plugin(glue.twitter_oauth1a_plugin)

  passport.use(new TwitterStrategy({
      consumerKey: config.authTwitter.ID,
      consumerSecret: config.authTwitter.SECRET,
      callbackURL: config.authTwitter.callbackURL
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreateTwitterUser(token, tokenSecret, profile, done);
    }
  ));
```

## Thanks
This builds on the work of many others, thanks!

 - [Passport](https://github.com/jaredhanson/passport)
 - [Mongoose](https://github.com/LearnBoost/mongoose)
 - [Express](https://github.com/visionmedia/express)
 - And many more
  
    
## License

OSI: The BSD License, FSF: The Modified BSD License
