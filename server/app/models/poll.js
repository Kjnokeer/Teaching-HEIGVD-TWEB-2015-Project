var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   creationDate: {
      type: Date,
      default: Date.now
   },
   access: {
     type: String,
     default: 'public',
     required: true
   },
   state: {
      type: String,
      required: true
   },
   users: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
   }
});

mongoose.model('Poll', PollSchema);
