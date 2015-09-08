'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, n, p[, rand] )
*	Creates a multidimensional array of binomial distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with binomial random numbers
*/
function random( dims, n, p, rand ) {
	var draw = partial( n, p, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
