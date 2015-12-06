var express = require('express'),
   router = express.Router();


module.exports = function(app) {
   app.use('/', router);
};

/** Attrape toutes les routes **/
router.use('/', function(req, res, next) {
   if(req.path === '/login' || req.path === '/signUp' || req.path.substring(0, 4) === "/api" || req.path.substring(0, 9) === '/audience')
      next();
   else if(req.session.email)
      if(req.path === '/')
         res.render('home/index', {email: req.session.email});
      else
         next();
   else
      res.render('login/index');
});

router.get('/', function(req, res, next) {
   res.render('login/index');
});

router.get('/home', function(req, res, next) {
   res.render('home/index', {email: req.session.email});
});