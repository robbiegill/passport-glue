describe('persistent_sessions_plugin -> ', function() {

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user')
    , persistent_sessions = require('../lib/persistent-sessions-plugin');

  if(mongoose.connection.db) {
      mongoose.disconnect();
    }
  mongoose.connect('mongodb://localhost/specs');

  userSchema.plugin(persistent_sessions);
  var PersistentModel = mongoose.model('PersistentModel', userSchema);

  it('should add a session_key property', function() {
    var u = new PersistentModel({session_key: 'a1-2d'});
    expect(u.session_key).toBe('a1-2d');
  });

  it('should be able to create a token', function() {
    var u = new PersistentModel();
    var token = u.createToken();
    expect(token).not.toBeNull();
  });

  it('should be able to deserialize a user', function(done) {
    var u = new PersistentModel({
      uid: '123',
      session_key: 'findme',
      display_name: 'deserialize'
    });
    u.save(function(err, user1) {
      PersistentModel.deserializeUser('findme', function(err, user) {
        expect(err).toBeNull();
        expect(user.display_name).toBe('deserialize');
        done();
      });
    });
  });

  it('should be able to serialize a user', function(done) {
    PersistentModel.findOneAndRemove({uid:'me'},function() {
      var u = new PersistentModel({uid:'me'});
      PersistentModel.serializeUser(u, function(err, key) {
        expect(err).toBeNull();
        expect(key).not.toBeNull();
        done();
      });
    });
  });


});