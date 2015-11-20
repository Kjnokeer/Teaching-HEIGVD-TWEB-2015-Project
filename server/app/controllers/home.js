var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll');

var path = require('path');

module.exports = function(app) {
   app.use('/', router);
};

// Affiche la page d'accueil
router.get('/', function(req, res, next) {

   Poll.find(function(err, polls) {
      if (err) return next(err);
      
      var nbPolls = polls.length;
      var nbPollsOpen = 0;
      var nbPollsCreatedThisWeek = 0;
      const SEVEN_DAYS_IN_MILLISECONDS = 604800000;

      for (var i in polls) {
         if (polls[i].state === 'active')
            nbPollsOpen++;

         if (Date.now() - polls[i].creationDate <= SEVEN_DAYS_IN_MILLISECONDS)
            nbPollsCreatedThisWeek++;
      }

      
      res.sendFile(path.join(__dirname, '/public/', 'index.html'));
/*
      res.render('index', {

         title: 'PollY - Easy Polls',
         nbPolls: nbPolls,
         nbPollsOpen: nbPollsOpen,
         nbPollsCreatedThisWeek: nbPollsCreatedThisWeek

      });
      */
   });

});
