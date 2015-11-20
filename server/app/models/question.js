var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   polls: {
      type: mongoose.Schema.ObjectId,
      ref: 'Poll'
   }
});

mongoose.model('Question', QuestionSchema);
