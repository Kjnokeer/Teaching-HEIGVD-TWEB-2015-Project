var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll'),
   Question = mongoose.model('Question'),
   Participation = mongoose.model('Participation'),
   Answer = mongoose.model('Answer'),
   Choice = mongoose.model('Choice');

module.exports = function(app) {
   app.use('/', router);
};

// Retourne tous les polls
router.get('/api/polls', function(req, res, next) {
   Poll.find(function(err, polls) {
      if (err) return next(err);

      res.send(polls);
   });
});

// Ajoute un nouveau poll
router.post('/api/polls', function(req, res, next) {
   var newPoll = new Poll({
      title: req.body.title,
      state: req.body.state,
      access: req.body.access
   });
   newPoll.save(function(err) {
      if (err) return next(err);
   });

   res.send(newPoll);
});

// Delete tous les polls
router.delete('/api/polls', function(req, res, next) {
   Poll.remove()
      .exec(function(err) {
         if (err) return next(err);

         res.send({
            message: 'DELETE success'
         });
      });
});

// Delete un poll
router.delete('/api/polls/:id', function(req, res, next) {
   Poll.remove({
      _id: req.params.id
   }, function(err) {
      if (err) return next(err);

      res.send({
         message: 'DELETE success'
      });
   });
});

// Edition d'un poll
router.put('/api/polls/:id', function(req, res, next) {
   Poll.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      state: req.body.state
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});

// Retourne les détails d'un poll
router.get('/api/polls/:id', function(req, res, next) {
   Poll.findById(req.params.id, function(err, poll) {
      if (err) return next(err);

      res.send(poll);
   });
});



// Retourne toutes les questions relatives au poll (:id)
router.get('/api/polls/:id/questions', function(req, res, next) {
   Question.find()
      .where('polls').equals(req.params.id)
      .exec(function(err, questions) {
         if (err) return next(err);

         res.send(questions);
      });
});

// Supprime toutes les questions relatives au poll (:id)
router.delete('/api/polls/:id/questions', function(req, res, next) {
   Question.remove()
      .where('polls').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({
            message: 'DELETE success'
         });
      });
});

// Ajoute une question dans le poll (:id)
router.post('/api/polls/:id/questions', function(req, res, next) {

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
router.get('/api/polls/*/questions/:id', function(req, res, next) {
   Question.findById(req.params.id, function(err, question) {
      if (err) return next(err);

      res.send(question);
   });
});

// Supprime la question (id)
router.delete('/api/polls/*/questions/:id', function(req, res, next) {
   Question.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({
            message: 'DELETE success'
         });
      });
});

// Modifie la question (id)
router.put('/api/polls/*/questions/:id', function(req, res, next) {
   Question.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      type: req.body.type
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});



// Retourne toutes les choix relatives à la question (:id)
router.get('/api/polls/*/questions/:id/choices', function(req, res, next) {
   Choice.find()
      .where('questions').equals(req.params.id)
      .exec(function(err, choices) {
         if (err) return next(err);

         res.send(choices);
      });
});

// Supprime tous les choix relatifs à la question (:id)
router.delete('/api/polls/*/questions/:id/choices', function(req, res, next) {
   Choice.remove()
      .where('questions').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({
            message: 'DELETE success'
         });
      });
});

// Ajoute un choix dans la question (:id)
router.post('/api/polls/*/questions/:id/choices', function(req, res, next) {
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
router.get('/api/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.findById(req.params.id, function(err, question) {
      if (err) return next(err);

      res.send(question);
   });
});

// Supprime le choix (id)
router.delete('/api/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         if (err) return next(err);

         res.send({
            message: 'DELETE success'
         });
      });
});

// Modifie la question (id)
router.put('/api/polls/*/questions/*/choices/:id', function(req, res, next) {
   Choice.findByIdAndUpdate(req.params.id, {
      key: req.body.key,
      text: req.body.text
   }, function(err, model) {
      if (err) return next(err);

      res.send(model);
   });
});


router.get('/api/polls/:id/participations', function(req, res, next) {
   Participation.find()
      .where('polls').equals(req.params.id)
      .exec(function(err, participations) {
         if (err) return next(err);

         res.send(participations);
      });
});


router.get('/api/polls/*/participations/:id/answers', function(req, res, next) {
   Answer.find()
      .where('participations').equals(req.params.id)
      .exec(function(err, answers) {
         if (err) return next(err);

         res.send(answers);
      });
});

router.get('/api/choices/', function(req, res, next) {
   Answer.find()
      .exec(function(err, answers) {
         if (err) return next(err);

         res.send(answers);
      });
});

router.get('/api/choices/:id/answers', function(req, res, next) {
   Answer.find()
      .where('choices').equals(req.params.id)
      .exec(function(err, answers) {
         if (err) return next(err);

         res.send(answers);
      });
});

router.post('/api/polls/:idPoll/questions/*/answers', function(req, res, next) {
   Participation.find()
      .where('participant').equals(req.body.pseudo)
      .where('polls').equals(req.params.idPoll)
      .exec(function(err, participation) {
         if (err) return next(err);

         var newParticipation;

         if (participation.length > 0) { // Une participation existe déjà
            newParticipation = participation[0];
         } else { // Il n'existe déjà pas de participation pour le couple pseudo - poll
            newParticipation = new Participation({
               participant: req.body.pseudo,
               polls: req.params.id
            });
            newParticipation.save(function(err) {
               if (err) return next(err);
            });
         }
         console.log("choiceId : " + req.body.choiceId);
         var newAnswer = Answer({
            choices: req.body.choiceId,
            participations: newParticipation._id
         });
         newAnswer.save(function(err) {
            if (err) return next(err);
         });

         res.send(newAnswer);
      });
});