var express = require('express'),
   router = express.Router(),
   mongoose = require('mongoose'),
   Poll = mongoose.model('Poll');

var path = require('path');

module.exports = function(app) {
   app.use('/', router);
};

router.get('/', function(req, res, next) {
   res.render('home/index', {test: 'mon message'});
   //res.sendFile(path.join(__dirname, '../views/home/', 'index.html'));
});