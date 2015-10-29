var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
   key: String,
   text: String,
   questions: {type: mongoose.Schema.ObjectId, ref: 'Question'}
});

mongoose.model('Choice', ChoiceSchema);