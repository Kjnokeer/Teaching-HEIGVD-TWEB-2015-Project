var _ = require('underscore'),
   copilot = require('api-copilot');

var polls = [
   ['La musique et vous', 'active'],
   ['Votre alimentation', 'closed'],
   ['La mode et vous', 'closed']
];

var questions = [
   ['Quel genre de musique écoutez-vous ?', 'à choix'],
   ['Quel est ton âge ?', 'libre'],
   ['Où habitez-vous', 'libre']
];

var choices = [
   ['1234', 'choix 1'],
   ['4321', 'choix 2'],
   ['3412', 'choix 3']
];

var firstPollId;

var scenario = new copilot.Scenario({
   name: 'Test REST API',
   summary: 'Test REST API using test data.',
   baseUrl: 'http://localhost:3000',
   defaultRequestOptions: {
      json: true
   }
});

// On supprime tous les polls
scenario.step('delete all polls', function() {
   return this.delete({
      url: '/polls/'
   });
});

// On ajoute les 3 polls qui se trouvent dans le tableau crée ci-dessus
scenario.step('create 3 polls', function() {
   var requests = _.map(polls, function(data) {
      return this.post({
         url: '/polls/',
         body: {
            title: data[0],
            state: data[1]
         }
      });
   }, this);

   // run HTTP requests in parallel
   return this.all(requests);
});

// On affiche les polls crée
scenario.step('show created polls', function(response) {
   var polls = _.pluck(response, 'body');

   console.log(polls.length + ' polls created:');
   _.each(polls, function(poll) {
      console.log('   - ' + poll.title + ' (' + poll.state + ')');
   });
});

// On récupère tous les polls
scenario.step('get all polls', function() {
   return this.get({
      url: '/polls/'
   });
});

// On les affiche et on ajout 3 questions dans le 1er poll
scenario.step('show all polls and add 3 questions in first poll', function(response) {
   var polls = response.body;
   firstPollId = polls[0]._id;

   _.each(polls, function(poll) {
      console.log('   - ' + poll.title + ' (' + poll.state + ')');
   });

   var requests = _.map(questions, function(data) {
      return this.post({
         url: '/polls/' + polls[0]._id + '/questions',
         body: {
            title: data[0],
            type: data[1],
            polls: polls[0]._id
         }
      });
   }, this);

   // run HTTP requests in parallel
   return this.all(requests);
});

// On affiche les questions créées
scenario.step('show created questions', function(response) {
   var questions = _.pluck(response, 'body');

   console.log(questions.length + ' questions created:');
   _.each(questions, function(question) {
      console.log('   - ' + question.title + ' (' + question.type + ')');
   });
});

// On récupère les questions se trouvant dans le 1er poll
scenario.step('get all questions in first poll', function() {
   return this.get({
      url: '/polls/' + firstPollId + '/questions'
   });
});

// On affiche toutes les questions se trouvant dans le 1er poll et on ajoute 3 choix dans la 1ère question
scenario.step('show all questions in first poll and add 3 choices in the first question', function(response) {
   var questions = response.body;

   _.each(questions, function(question) {
      console.log('   - ' + question.title + ' (' + question.type + ')');
   });

   var requests = _.map(choices, function(data) {
      return this.post({
         url: '/polls/' + firstPollId + '/questions/' + questions[0]._id + '/choices',
         body: {
            key: data[0],
            text: data[1],
            questions: questions[0]._id
         }
      });
   }, this);

   // run HTTP requests in parallel
   return this.all(requests);
});

// On affiche les 3 choix créés
scenario.step('show created choices', function(response) {
   var choices = _.pluck(response, 'body');

   console.log(choices.length + ' choices created:');
   _.each(choices, function(choice) {
      console.log('   - ' + choice.key + ' (' + choice.text + ')');
   });
});


module.exports = scenario;