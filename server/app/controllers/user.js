var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Poll = mongoose.model('Poll'),
    User = mongoose.model('User');


var sessionId = '123456789';

module.exports = function(app) {
  app.use('/', router);
};

router.get('/user', function(req, res, next) {
  User.find(function(err, users) {
    res.send(users);
  });
});

// Affiche les polls
router.get('/user/polls', function(req, res, next) {
  Poll
    .find()
    .where('users').equals('565862737688f9041e703b22')
    .exec(function(err, polls) {
    if (err) return next(err);

      res.send(polls);
    });
});
