var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll'),
   Question = mongoose.model('Question'),
   Choice = mongoose.model('Choice');

module.exports = function(app) {
   app.use('/', router);
};

var requireLogin = require('./login.js');

console.log("Adding middleware...");





// Affiche les polls
router.get('/polls' , function(req, res, next) {
  // console.log(requireLogin(req, res, next));
   Poll.find(function(err, polls) {
      if (err) return next(err);

      res.send(polls);
   });
});



// Ajoute un nouveau poll
router.post('/polls', requireLogin, function(req, res, next) {

   var newPoll = new Poll({
      title: req.body.title,
      state: req.body.state
   });
   newPoll.save(function(err) {
      if (err) return next(err);
   });

   res.send(newPoll);
});

// Delete tous les polls
router.delete('/polls', function(req, res, next) {
   Poll.remove()
      .exec(function(err) {
         if (err) return next(err);

         res.send({ message: 'DELETE success'});
      });
});

// Delete un poll
router.delete('/polls/:id', function(req, res, next) {
   Poll.remove({
      _id: req.params.id
   }, function(err) {
      if (err) return next(err);

      res.send({ message: 'DELETE success'});
   });
});

// Edition d'un poll
router.put('/polls/:id', function(req, res, next) {
   Poll.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      state: req.body.state
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});

// Affiche les détails d'un poll et permet de le modifier
router.get('/polls/:id', function(req, res, next) {
   Poll.findById(req.params.id, function(err, poll) {
      if (err) return next(err);

      res.send(poll);
   });
});



// Retourne toutes les questions relatives au poll (:id)
router.get('/polls/:id/questions', function(req, res, next) {
   Question.find()
      .where('polls').equals(req.params.id)
      .exec(function(err, questions) {
         if (err) return next(err);

         res.send(questions);
      });
});

// Supprime toutes les questions relatives au poll (:id)
router.delete('/polls/:id/questions', function(req, res, next) {
   Question.remove()
      .where('polls').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({ message: 'DELETE success'});
      });
});

// Ajoute une question dans le poll (:id)
router.post('/polls/:id/questions', function(req, res, next) {
   var newQuestion = new Question({
      title: req.body.title,
      type: req.body.type,
      polls: req.params.id
   });
   newQuestion.save(function(err) {
      if (err) return next(err);
   });

   res.send(newQuestion);
});

// Récupère la question (id)
router.get('/polls/*/questions/:id', function(req, res, next) {
   Question.findById(req.params.id, function(err, question) {
      if (err) return next(err);

      res.send(question);
   });
});

// Supprime la question (id)
router.delete('/polls/*/questions/:id', function(req, res, next) {
   Question.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({ message: 'DELETE success'});
      });
});

// Modifie la question (id)
router.put('/polls/*/questions/:id', function(req, res, next) {
   Question.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      type: req.body.type
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});



// Retourne toutes les choix relatives à la question (:id)
router.get('/polls/*/questions/:id/choices', function(req, res, next) {
   Choice.find()
      .where('questions').equals(req.params.id)
      .exec(function(err, choices) {
         if (err) return next(err);

         res.send(choices);
      });
});

// Supprime tous les choix relatifs à la question (:id)
router.delete('/polls/*/questions/:id/choices', function(req, res, next) {
   Choice.remove()
      .where('questions').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({ message: 'DELETE success'});
      });
});

// Ajoute un choix dans la question (:id)
router.post('/polls/*/questions/:id/choices', function(req, res, next) {
   var newChoice = new Choice({
      key: req.body.key,
      text: req.body.text,
      questions: req.params.id
   });
   newChoice.save(function(err) {
      if (err) return next(err);
   });

   res.send(newChoice);
});

// Récupère le choix (id)
router.get('/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.findById(req.params.id, function(err, question) {
      if (err) return next(err);

      res.send(question);
   });
});

// Supprime le choix (id)
router.delete('/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({ message: 'DELETE success'});
      });
});

// Modifie la question (id)
router.put('/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.findByIdAndUpdate(req.params.id, {
      key: req.body.key,
      text: req.body.text
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});
