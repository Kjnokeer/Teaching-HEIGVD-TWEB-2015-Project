var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
   participant: String,
   submissionDate: Date,
   polls: {type: mongoose.Schema.ObjectId, ref: 'Poll'}
});

mongoose.model('Participation', ParticipationSchema);