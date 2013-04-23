var bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

module.exports = exports = function password_user_plugin (schema, options) {

  schema.add({
    password: {type: String}
  });

  schema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {return next();}

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {return next(err);}

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {return next(err);}
        user.password = hash;
        next();
      });
    });
  });

  var codes = schema.statics.failedAuth = {
    NOT_FOUND: 0,
    PASSWORD_FAILURE: 1
  };

  schema.methods.comparePassword = function(testPassword, cb) {
    bcrypt.compare(testPassword, this.password, function(err, isMatch) {
      if (err) {return next(err);}
      cb(null, isMatch);
    });
  };

  schema.statics.getAuthenticated = function(username, password, cb) {
    this.findOne({username: username}, function(err, user) {
      if (err) {return next(err);}

      // user not found
      if (!user) {
        return cb(null, null, codes.NOT_FOUND);
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {return next(err);}

        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(null, null, codes.PASSWORD_FAILURE);
        }
      });

    });
  };

};