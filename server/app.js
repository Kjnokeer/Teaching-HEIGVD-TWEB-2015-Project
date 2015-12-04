var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
   require(model);
});
var app = express();

require('./config/express')(app, config);

var server = app.listen(config.port, function () {
   console.log('Express server listening on port ' + config.port);
});

var io = require('socket.io')(server);


var numberClients= 0; 
io.on('connection', function(socket){
  
  console.log("A new socket.io client has arrived");

  // chaque fois qu'un nouveau client se connecte on incrémente
  socket.emit('userNumber', numberClients); // 
  numberClients +=1;

  // chaque fois qu'on reçois new on le rediffuse à tout le monde
  socket.on('news', function(data){
    socket.emit('news', data);
  });

  // lorsque l'évément btnYes est émit, il faut diffuser au niveau du server
  socket.on('btnYes', function(data){
    console.log(data);
    io.emit('btnYes', data);
  });


  // lorsque l'évément btnNo est émit, il faut diffuser au niveau du server, pour que tout les client se mettent à jour
  socket.on('btnNo', function(data){
    console.log(data);
    io.emit('btnNo', data);
  });


  // lorsque l'évément btnNo est émit, il faut diffuser au niveau du server, pour que tout les client se mettent à jour
  socket.on('dKnow', function(data){
    console.log(data);
    io.emit('dKnow', data);
  });

});
