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

var QuestionModel = mongoose.model('Question', QuestionSchema);

QuestionModel.remove({}, function(err) {
   if (err) throw err;
});

var question = new QuestionModel({
   title: 'Question 1',
   type: 'libre',
   polls: '563224110023c0e30945c5fd'
});
question.save(null);

question = new QuestionModel({
   title: 'Question 2',
   type: 'à choix',
   polls: '563224110023c0e30945c5fd'
});
question.save(null);