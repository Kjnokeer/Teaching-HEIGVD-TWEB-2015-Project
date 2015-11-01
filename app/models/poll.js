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
   state: {
      type: String,
      required: true
   }
});

mongoose.model('Poll', PollSchema);