var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll'),
   Question = mongoose.model('Question');

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

   console.log(req);

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


// Retourne toutes les questions relatives au poll (:id)
router.get('/polls/:id/questions', function(req, res) {
   Question.find()
      .where('polls').equals(req.params.id)
      .exec(function(err, questions) {
         res.send(questions);
   });
});

// Supprime toutes les questions relatives au poll (:id)
router.delete('/polls/:id/questions', function(req, res) {
   Question.remove()
      .where('polls').equals(req.params.id)
      .exec(function(err) {
         res.send('delete success');
   });
});

// Ajoute une question dans le poll (:id)
router.post('/polls/:id/questions', function(req, res) {
   new Question({
      title: req.body.title,
      type: req.body.type,
      polls: req.params.id
   })
   .save(function(err) {
      if (err) {
         console.log('Error');
      }
   });

   res.send('post');
});


// Ajoute une question dans le poll (:id)
router.post('/polls/:id/questions', function(req, res) {
   new Question({
      title: req.body.title,
      type: req.body.type,
      polls: req.params.id
   })
   .save(function(err) {
      if (err) throw err;
   });

   res.send('post');
});