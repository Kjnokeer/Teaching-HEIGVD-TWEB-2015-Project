var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipationSchema = new Schema({
   participant: {
      type: String,
      default: 'anonymous'
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

/*

var Participation = mongoose.model('Participation', ParticipationSchema);

Participation.remove().exec();

var u = new Participation({
   participant: "Manamiz",
   polls: "5662cce7e0a444c5437c84fb"
});
u.save(function(err) {});

var u = new Participation({
   participant: "Kjnokeer",
   polls: "5662cce7e0a444c5437c84fb"
});
u.save(function(err) {});

var u = new Participation({
   participant: "Unsafedriving",
   polls: "5662cce7e0a444c5437c84fb"
});
u.save(function(err) {});
*/