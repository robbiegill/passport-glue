describe('user schema -> ', function(){

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user');
  var UserModel = mongoose.model('UserModel', userSchema);


  it('should have a required, unique propery uid', function(){
    expect(userSchema.paths['uid']).not.toBeUndefined();
    expect(userSchema.paths['uid'].isRequired).toBeTruthy();
    expect(userSchema.paths['uid'].options.index).toBeTruthy();
    expect(userSchema.paths['uid'].options.unique).toBeTruthy();
  });

  it('should have a propery email', function(){
    expect(userSchema.paths['email']).not.toBeUndefined();
  });

  it('should have a propery display_name', function(){
    expect(userSchema.paths['display_name']).not.toBeUndefined();
    expect(userSchema.paths['uid'].isRequired).toBeTruthy();
  });

  it('should have a propery auth_provider', function(){
    expect(userSchema.paths['auth_provider']).not.toBeUndefined();
  });

  it('should have a propery ts_created', function(){
    expect(userSchema.paths['ts_created']).not.toBeUndefined();
  });

  it('should have a propery ts_modified', function(){
    expect(userSchema.paths['ts_modified']).not.toBeUndefined();
  });
});