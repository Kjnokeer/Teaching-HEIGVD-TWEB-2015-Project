var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Poll = mongoose.model('Poll'),
    User = mongoose.model('User');


var sessionId = '123456789';

module.exports = function(app) {
  app.use('/', router);
};

router.get('/api/user', function(req, res, next) {
  User.find(function(err, users) {
    res.send(users);
  });
});

router.post('/user/polls', function(req, res, next) {

   var newPoll = new Poll({
      title: req.body.title,
      state: req.body.state,
      users: req.session.userId
   });
   newPoll.save(function(err) {
      if (err) 
        return next(err);
   });

   res.send(newPoll);
});

// Affiche les polls
router.get('/user/polls', function(req, res, next) {
  Poll
    .find()
    .where('users').equals(req.session.userId)
    .exec(function(err, polls) {
    if (err) return next(err);

      res.send(polls);
    });
});

// Affiche les détails d'un account et permet de le modifier
router.get('/user/account/', function(req, res, next) {
   User.findById(req.session.userId, function(err, user) {
      if (err) return next(err);

      res.send(user);
   });
});

router.put('/user/account', function(req, res, next) {

   User.findByIdAndUpdate(req.session.userId, {
      firstname: req.body.firstname,
      lastname: req.body.lastname
   }, 
   function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});
