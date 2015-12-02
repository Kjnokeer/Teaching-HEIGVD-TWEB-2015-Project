var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll');
   User = mongoose.model('User');

var path = require('path');
var requireLogin = require('./login.js');

module.exports = function(app) {
   app.use('/', router);
};

// router.use( function(req, res, next) {
//   console.log("noums ... ###########################################################");
//   // res.render('home/index', {test: 'mon message'});
//   //res.sendFile(path.join(__dirname, '../views/home/', 'index.html'));
//   next();
// });
//
//
//
// router.get('/login', function(req, res, next) {
//    res.render('home/login');
//    //res.sendFile(path.join(__dirname, '../views/home/', 'index.html'));
// });



router.get('/index', function(req, res, next) {
console.log(requireLogin);
   res.render('home/index', {test: 'mon message'});
   //res.sendFile(path.join(__dirname, '../views/home/', 'index.html'));
});



