/**
 * This module defines
 */

var beers = [];


/**
 * This is one of the module patterns. We export the constructor,
 * so that scripts that use this module can do:
 * var beersDS = require('datastore').beersDataStore
 * var beers = beersDS.getAll();
 *
 * https://darrenderidder.github.io/talks/ModulePatterns/#/9
 */


var addBeer = function(beer) {
  beer.id = beers.length;
  beers.push(beer);
};

var getAllBeers = function() {
  var clone = beers.slice(0);
  return clone;
};

var getBeer = function(id) {

  var n = beers.length;
  for (var i = 0; i < n; i++) {
    if (beers[i].id == id) {
      return beers[i];
    }
  }

  return null;
};

var deleteBeer = function(beer) {

  var i = beers.indexOf(beer);
  if (i < 0) {
    return false;
  }

  beers.splice(i, 1);
  return true;
};

exports.beersDataStore = {
  add: addBeer,
  getAll: getAllBeers,
  get: getBeer,
  delete: deleteBeer
};
