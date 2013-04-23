var uuid = require('node-uuid');

module.exports = exports = function persistent_sessions_plugin (schema, options) {

  schema.add({
    session_key: {type: String, unique: true}
  });

  schema.methods.createToken = function() {
    return uuid.v4();
  };

  schema.static('serializeUser', function (user, done) {
    var self = this;
    var createSessionKey = function () {
      var token = user.createToken();
      self.findOne({session_key: token}, function(err, existingUser) {
        if (err) {return done(err);}
        if (existingUser) {
          createSessionKey();
        } else {
          user.set( 'session_key', token );
          user.save(function(err){
            if (err) {return done(err);}
            return done(null, user.get('session_key'));
          });
        }
      });
    };
    if ( user.uid ) {
      createSessionKey();
    }
  });

  schema.static('deserializeUser', function (obj, done) {
    var self = this;
    self.findOne({session_key: obj}, function(err, user){
      if (err) {return done(err);}
      done(null, user);
    });
  });

};