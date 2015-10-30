var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
   participant: {
      type: String,
      required: true
   },
   submissionDate: {
      type: Date,
      required: true
   },
   polls: {
      type: mongoose.Schema.ObjectId,
      ref: 'Poll'
   }
});

mongoose.model('Participation', ParticipationSchema);