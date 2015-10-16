var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Poll = mongoose.model('Poll');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  Poll.find(function (err, polls) {

    if (err) return next(err);

    res.render('index', {

      title: 'PollY - Easy Polls',
      polls: polls

    });
  });
});



router.get('/polls', function(req, res) {
  Poll.find(function(err, polls) {

    if (err) throw err;

    res.render('polls', {
      polls: polls
    });
  });
});

router.post('/polls', function(req, res) {
  var newPoll = new Poll({title: req.body.title, state: req.body.state});
  newPoll.save(function(err) {
    if(err) throw err;
  });

  res.redirect('back')
});


router.get('/polls/delete/:id', function(req, res) {
  Poll.remove({ _id: req.params.id }, function(err) {
    if(err) throw err;
  });

  res.redirect('back');
});


router.get('/polls/edit/:id', function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    res.render('editPoll', {
      poll: poll
    }); 
  });
});


router.post('/polls/edit', function(req, res) {
  Poll.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    state: req.body.state
  }, function(err, model) {
    if(err) throw err;
  });
  res.redirect('/polls');
});