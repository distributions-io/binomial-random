'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, n, p[, rand] )
*	Creates an array of binomial distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with binomial random numbers
*/
function random( len, n, p, rand ) {
	var out,
		draw,
		i;

	draw = partial( n, p, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
