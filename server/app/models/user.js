var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
});

mongoose.model('User', UserSchema);

/*
var User = mongoose.model('User', UserSchema);

var u = new User({
   email: "john@doe.com",
   firstname: "John",
   lastname: "Doe",
   password: "pass"
});
u.save(function(err) {

});*/