var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
   choices: {type: mongoose.Schema.ObjectId, ref: 'Choice'},
   participations: {type: mongoose.Schema.ObjectId, ref: 'Participation'}
});

mongoose.model('Answer', AnswerSchema);
/*
var Answer = mongoose.model('Answer', AnswerSchema);

Answer.remove().exec();

var u = new Answer({
   participations: "5664399ec12bfd94159e69d7",
   choices: "5662ccece0a444c5437c84fd"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d7",
   choices: "5662ccf6e0a444c5437c8500"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d7",
   choices: "5662cd0be0a444c5437c8504"
});
u.save(function(err) {});


var u = new Answer({
   participations: "5664399ec12bfd94159e69d8",
   choices: "5662ccece0a444c5437c84fd"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d8",
   choices: "5662ccf6e0a444c5437c8501"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d8",
   choices: "5662cd0be0a444c5437c8504"
});
u.save(function(err) {});


var u = new Answer({
   participations: "5664399ec12bfd94159e69d9",
   choices: "5662ccece0a444c5437c84fe"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d9",
   choices: "5662ccf6e0a444c5437c8502"
});
u.save(function(err) {});

var u = new Answer({
   participations: "5664399ec12bfd94159e69d9",
   choices: "5662cd0be0a444c5437c8506"
});
u.save(function(err) {});
*/