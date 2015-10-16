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
    port: 3000,
    db: 'mongodb://localhost/tweb-production'
  }
};

module.exports = config[env];
