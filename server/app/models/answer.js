var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
   choices: {type: mongoose.Schema.ObjectId, ref: 'Choice'},
   participations: {type: mongoose.Schema.ObjectId, ref: 'Participation'}
});

mongoose.model('Answer', AnswerSchema);