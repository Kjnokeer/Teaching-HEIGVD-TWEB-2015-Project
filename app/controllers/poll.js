var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll'),
   Question = mongoose.model('Question'),
   Choice = mongoose.model('Choice');

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

// Récupère la question (id)
router.get('/polls/*/questions/:id', function(req, res) {
   Question.findById(req.params.id, function(err, question) {
      res.send(question);
   });
});

// Supprime la question (id)
router.delete('/polls/*/questions/:id', function(req, res) {
   Question.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         res.send('delete success');
      });
});

// Modifie la question (id)
router.put('/polls/*/questions/:id', function(req, res) {
   Question.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      type: req.body.type
   }, function(err, model) {
      if (err) throw err;

      res.send('PUT success');
   });
});





// Retourne toutes les choix relatives à la question (:id)
router.get('/polls/*/questions/:id/choices', function(req, res) {
   Choice.find()
      .where('questions').equals(req.params.id)
      .exec(function(err, questions) {
         res.send(questions);
      });
});

// Supprime tous les choix relatifs à la question (:id)
router.delete('/polls/*/questions/:id/choices', function(req, res) {
   Choice.remove()
      .where('questions').equals(req.params.id)
      .exec(function(err) {
         res.send('delete success');
      });
});

// Ajoute un choix dans la question (:id)
router.post('/polls/*/questions/:id/choices', function(req, res) {
   new Choice({
         key: req.body.key,
         text: req.body.text,
         questions: req.params.id
      })
      .save(function(err) {
         if (err) {
            console.log('Error');
         }
      });

   res.send('post');
});

// Récupère le choix (id)
router.get('/polls/*/questions/*/choices/:id', function(req, res) {
   Choice.findById(req.params.id, function(err, question) {
      res.send(question);
   });
});

// Supprime le choix (id)
router.delete('/polls/*/questions/*/choices/:id', function(req, res) {
   Choice.remove()
      .where('_id').equals(req.params.id)
      .exec(function(err) {
         res.send('delete success');
      });
});

// Modifie la question (id)
router.put('/polls/*/questions/*/choices/:id', function(req, res) {
   Choice.findByIdAndUpdate(req.params.id, {
      key: req.body.key,
      text: req.body.text
   }, function(err, model) {
      if (err) throw err;

      res.send('PUT success');
   });
});
