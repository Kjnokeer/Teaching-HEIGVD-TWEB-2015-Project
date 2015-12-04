var express = require('express'),
   router = express.Router();


module.exports = function(app) {
   app.use('/', router);
};

/** Attrape toutes les routes **/
router.post('/audience', function(req, res, next) {

	req.session = req.body.pseudo;

	console.log(req.body.pseudo);

	// Va chercher dans les partials
	res.render('audience/question');

});