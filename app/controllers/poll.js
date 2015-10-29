var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll');

module.exports = function(app) {
   app.use('/', router);
};

// Affiche les polls
router.get('/polls', function(req, res) {
   Poll.find(function(err, polls) {
      if (err) throw err;

      res.render('polls', {
         polls: polls
      });
   });
});

// Ajoute un nouveau poll
router.post('/polls', function(req, res) {
   var newPoll = new Poll({
      title: req.body.title,
      state: req.body.state
   });
   newPoll.save(function(err) {
      if (err) throw err;
   });

   res.redirect('back')
});

// Delete un poll
router.delete('/polls/:id', function(req, res) {
   Poll.remove({
      _id: req.params.id
   }, function(err) {
      if (err) throw err;

      res.send('DELETE success');
   });
});

// Edition d'un poll
router.put('/polls/:id', function(req, res) {
   Poll.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      state: req.body.state
   }, function(err, model) {
      if (err) throw err;

      res.send('PUT success');
   });
});

// Affiche les détails d'un poll et permet de le modifier
router.get('/polls/:id', function(req, res) {
   Poll.findById(req.params.id, function(err, poll) {
      res.render('edit-poll', {
         poll: poll
      });
   });
});