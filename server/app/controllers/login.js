var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   User = mongoose.model('User');

module.exports = function(app) {
   app.use('/', router);
};

router.post('/login', function(req, res, next) {
   User.find({email: req.body.email, password: req.body.password}, function(err, users) {
      if(users.length <= 0) {
         res.redirect('/');
      }
      else {
         req.session.email = req.body.email;
         req.session.userId = users[0]._id;
         res.redirect('/home');
      }
   });
});

router.post('/signUp', function(req, res, next) {
   var newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
   });
   newUser.save(function(err) {
      if (err) return next(err);
   });

   res.redirect('/');
});

router.get('/logout', function(req, res, next) {
   req.session.destroy(function(err) {
      if (err)
         throw err;
      else
         res.redirect('/');
   })
});