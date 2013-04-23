describe('local-auth-plugin -> ', function(){

  var mongoose = require('mongoose')
    , userSchema = require('../lib/user')
    , local_auth_plugin = require('../lib/local-auth-plugin');

  userSchema.plugin(local_auth_plugin);
  var LocalModel = mongoose.model('LocalModel', userSchema);

  it('will fail', function(){
    var a = false;
    //expect(a).toBeTruthy();
  });


});