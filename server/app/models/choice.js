var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
   key: {
      type: String,
      required: true
   },
   text: {
      type: String,
      required: true
   },
   questions: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question'
   }
});

mongoose.model('Choice', ChoiceSchema);