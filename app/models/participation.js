var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
   participant: {
      type: String,
      required: true
   },
   submissionDate: {
      type: Date,
      default: Date.now
   },
   polls: {
      type: mongoose.Schema.ObjectId,
      ref: 'Poll'
   }
});

mongoose.model('Participation', ParticipationSchema);