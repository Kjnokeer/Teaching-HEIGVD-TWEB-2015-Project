/**
 * Constructor for Beer objects
 *
 * @param name the name of the beer, such as Guiness
 * @param country the origin country for the beer, such as Ireland
 * @constructor
 */

var Beer = function(name, country) {
  this.name = name;
  this.country = country;
}

/**
 * We attach a function to Beer.prototype, so that all beer objects
 * share the same code.
 */
Beer.prototype.drink = function() {
  return "Glou glou " + this.name + " from " + this.country;
}

/**
 * This is one of the module patterns. We export the constructor,
 * so that scripts that use this module can do:
 * var Beer = require([relateive path]beer.js);
 * var beer1 = new Beer("Guiness", "Ireland");
 *
 * See https://darrenderidder.github.io/talks/ModulePatterns/#/10
 */
module.exports = Beer;
