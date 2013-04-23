var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ts_created = require('goose-plugins').ts_created
  , ts_modified = require('goose-plugins').ts_modified;

var userSchema = new Schema({
  uid: {type: String, required: true, index: true, unique: true },
  email: {type: String},
  display_name: {type: String},
  auth_provider: {type: String}
});

userSchema.plugin(ts_created);
userSchema.plugin(ts_modified);

module.exports = userSchema;