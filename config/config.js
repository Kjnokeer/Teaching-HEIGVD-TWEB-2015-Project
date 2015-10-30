var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tweb'
    },
    port: 3000,
    db: 'mongodb://localhost/tweb-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tweb'
    },
    port: 3000,
    db: 'mongodb://localhost/tweb-test'
  },
  
  production: {
	  root: rootPath,
	  app: {
		  name: 'tweb'
	  },
	  port: process.env.PORT,
	  db: 'mongodb://admin:pass1234*@ds047524.mongolab.com:47524/heroku_l6n3q8x9'
  }
};

module.exports = config[env];
