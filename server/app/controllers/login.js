// Ce fichier permet d'implémenter le login et la logique qui permet de
// gérer l'authentification de l'utilisateur
var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Poll = mongoose.model('Poll');
User = mongoose.model('User');

// implementation de l'authentification
var bodyParser = require('body-parser');
var bcrypt    = require('bcryptjs');
var path = require('path');
var sessions = require('client-sessions');

module.exports = function(app) {
  app.use('/', router);
};




router.use(bodyParser.urlencoded({ extended: true }));


router.use(sessions({
  cookieName: 'session',
  secret: 'sfdasasdkjsjsfnskldfjsidfisfelsjfkesfk',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  // httpOnly: true, // dont let browser javascript access cookie ever
  // secure: true,    // only use cookies over https
  ephemeral: true // delete this cookie when the browser is closed (this is usefull when people are using public computers)
}));



router.use(function(req, res, next){
  if (req.session && req.session.user) {
    User.findOne({email: req.session.user.email}, function(err, user){
      if (user){
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }
      next();
    });
  } else{
    // if ( req.path == '/') 
      //   return next();
    // res.render('home/login');
    next();
  }
});




function requireLogin(req, res, next){
  if (!req.user && req.path != '/'){
    // res.render('home/login');
    // res.render('/login'#<{(| , {test: 'mon message'} |)}>#);
    res.render('home/index'/* , {test: 'mon message'} */);
    // res.render('home/index'#<{(| , {test: 'mon message'} |)}>#);
  } else{
    next();
  }
}



router.get('/login', function(req, res){
  console.log(requireLogin);
  res.render('home/login'/* , { csrfToken: req.csrfToken() } */);
});



// "users", { "email": "spam@gmail.com"}
router.post('/login', function(req, res){
  console.log(req.body);
  // console.log("Post Login here");
  // console.log("user " + req.body);
  // console.log("login" + req.body);

  User.findOne({"email": req.body.email}, function(err, user){
    console.log("not found");
    console.log("err :" + err);
    console.log("user :" + user);
    if(!user){
      res.render('home/login');
      // res.render('/home/login', {error: 'Invalid username or password.'});
    }else{
      console.log("found !!!");
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user; // encrypts userName, firstName, lastName, password ... in cookie
        res.locals.user = user;
        // console.log(req.session.cookie);
        res.redirect('/');
      }else{
        res.redirect('/login');
        // res.render('home/index');
        // res.render('login.jade', {error: 'Invalid email or password.'});
      }
    }
  });
});



// router.get('/register', function(req, res){
//   res.render('home/register');
// });
//
//
// router.post('/register', function(req, res){
//   var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//   var user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     password: hash,
//     email: req.body.email
//   });
//
//   user.save(function(err){
//     if(err){
//       var error = 'something bad happened! please try again!';
//       if ( err.code === 11000 ){
//         error = 'That email is already taken try another';
//       }
//       // console.log("There is and error " + err.code) ;
//       res.render('register.jade', {error: error});
//     } else{
//
//       User.find(function(err, users){
//         console.log(users);
//         res.send(users);
//       })
//     }
//   });
// });




router.get('/', 

  function (req, res, next){
    if (!req.user && req.path != '/'){
      // next();
      res.redirect('/login');
    } else{
      next();
    }
  }
  , function(req, res, next) {
    res.render('home/index'/* , {test: 'mon message'} */);
  });

