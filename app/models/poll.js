var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
  title: String,
  creationDate: {type: Date, default: Date.now},
  state: String
});

var PollModel = mongoose.model('Poll', PollSchema);

PollModel.remove({}, function(err) {
  if(err) throw err;

  console.log('Table "Poll" vidée avec succés');
});


/* POUR LES TESTS */

var poll = new PollModel({title: 'Poll 1', state:'active'});
poll.save(null);

poll = new PollModel({title: 'Poll 2', state:'active'});
poll.save(null);

poll = new PollModel({title: 'Poll 3', state:'active'});
poll.save(null);

poll = new PollModel({title: 'Poll 4', state:'closed'});
poll.save(null);

poll = new PollModel({title: 'Poll 5', state:'closed', creationDate:'2011-04-11'});
poll.save(null);

poll = new PollModel({title: 'Poll 6', state:'drafti'});
poll.save(null);