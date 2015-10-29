var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
   title: String,
   type: String,
   polls: {type: mongoose.Schema.ObjectId, ref: 'Poll'}
});

mongoose.model('Question', QuestionSchema);