var express = require('express'),
   router = express.Router();


module.exports = function(app) {
   app.use('/', router);
};

/** Attrape toutes les routes **/
router.get('/audience/poll', function(req, res, next) {

	//req.session = req.body.pseudo;

	//console.log(req.body.pseudo);

	console.log(req.body.pollnr);


	// Peut importe ce qu'il répond
	//res.render('audience/question');

	res.send("voiture: opel");

});