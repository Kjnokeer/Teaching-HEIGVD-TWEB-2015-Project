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

var ChoiceModel = mongoose.model('Choice', ChoiceSchema);

ChoiceModel.remove({}, function(err) {
   if (err) throw err;
});

var choice = new ChoiceModel({
   key: 'choice 1',
   text: 'mon choice',
   questions: '56337bc992b559b8184134cf'
});
choice.save(null);

choice = new ChoiceModel({
   key: 'choice 2',
   text: 'mon choice 2',
   questions: '56337bc992b559b8184134cf'
});
choice.save(null);