var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Beer = require('../models/beer'),
  beersDataStore = require('../services/datastore').beersDataStore;


module.exports = function (app) {
  app.use('/beers', router);
};


/**
 * Define a route for HTTP requests with a GET method sent to /beers.
 * Some clients will send Accept: text/html, others will send Accept: application/json
 */
router.get('/', function (req, res) {

  /*
   * In any case, we need to get the list of beers
   */
  var beers = beersDataStore.getAll();

  /*
   * What we do afterwards depends on the Accept header
   */
  res.format({
    'application/json': function() {
      res.send(beers); // the client wants JSON, we can send the object directly
    },
    'text/html': function() {
      res.render('beers', {'beers': beers}); // the client was HTML, we render a jade view
    }
  });
});


/**
 * Define a route for HTTP requests with a POST method sent to /beers.
 * We expect to receive a beer JSON payload from clients
 */
router.post('/', function(req, res) {
  var payload = req.body;
  var newBeer = new Beer(payload.name, payload.country);
  beersDataStore.add(newBeer);
  console.log(newBeer.drink());
  res.send(beersDataStore.getAll());
});
