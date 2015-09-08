'use strict';

// MODULES //

var fc = require( './fc.js' ),
	sgn = require( 'compute-signum' );


// FUNCTIONS //

var abs = Math.abs,
	floor = Math.floor,
	ln = Math.log,
	sqrt = Math.sqrt;


// GENERATE BINOMIAL RANDOM NUMBERS //

/**
* FUNCTION random( n, p[, rand] )
*	Generates a random draw from a binomial distribution with parameters `n` and `p`.
*	For `n * p < 10`, the function simulates Bernoulli draws and returns their sum. Otherwise,
*	the BTRD algorithm by W. Hörmann is used.
*		Reference: Hörmann, W. (1993). The generation of binomial random variates.
*		Journal of Statistical Computation and Simulation.
*		doi:10.1080/00949659308811496
*
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( n, p, rand ) {
	var k, m, r, nr, npq,
		a, b, c, alpha,
		vr, urvr,
		u, us, v,
		km, rho, i, f, t,
		nm, h, nk,
		goto, ret;

	rand = rand ? rand : Math.random;

	if ( p > 0.5 ) {
		return n - random( n, 1 - p, rand );
	}

	if ( n * p < 10 ) {
		// Just simulate Bernoulli random variables...
		ret = 0;
		for ( i = 0; i < n; i++ ) {
			if ( rand() <= p ) {
				ret++;
			}
		}
		return ret;
	}

	m = floor( ( n + 1 ) * p );
	r = p / ( 1 - p );
	nr = ( n + 1 ) * r;
	npq = n * p * ( 1 - p);
	b = 1.15 + 2.53 * sqrt( npq );
	a = -0.0873 + 0.0248 * b + 0.01 * p;
	c = n * p + 0.5;
	alpha = ( 2.83 + 5.1/b ) * sqrt( npq );
	vr = 0.92 - 4.2/b;
	urvr = 0.86 * vr;
	nm = n - m + 1;
	h = (m+0.5) * ln( (m+1)/(r*nm) ) + fc( m ) + fc( n - m );

	goto = 1;
	while ( true ) {
		switch ( goto ) {
		case 1:
			v = rand();
			if ( v <= urvr ) {
				u = v/vr - 0.43;
				return floor( ( 2*a / ( 0.5 - abs(u) ) + b ) * u + c );
			}
			goto = 2;
		break;
		case 2:
			if ( v >= vr ) {
				u = rand() - 0.5;
			} else {
				u = v/vr - 0.93;
				u = sgn( u ) * 0.5 - u;
				v = vr * rand();
			}
			goto = 3;
		break;
		case 3:
			us = 0.5 - abs(u);
			k = floor( ( 2 * a/us + b ) * u + c );
			if ( k < 0 || k > n ) {
				goto = 1;
				break;
			}
			v = v * alpha / ( a/(us*us) + b );
			km = abs( k - m );
			if ( km > 15 ) {
				goto = 5;
				break;
			}
			goto = 4;
		break;
		case 4:
			f = 1;
			if ( m < k ) {
				for ( i = m; i <= k; i++ ) {
					f *= nr/i - r;
				}
			}
			if ( m > k ) {
				for ( i = k; i <= m; i++ ) {
					v *= nr/i - r;
				}
			}
			if ( v <= f ) {
				return k;
			} else {
				goto = 1;
			}
		break;
		case 5:
			v = ln( v );
			rho = ( km / npq ) * ( ( ( km/3 + 0.625 ) * km + 1/6 ) / npq + 0.5 );
			t = -( km * km ) / ( 2 * npq );
			if ( v < t - rho ) {
				return k;
			}
			if ( v > t + rho ) {
				goto = 1;
				break;
			}
			goto = 6;
		break;
		case 6:
			nk = n - k + 1;
			if ( v <= h + (n+1) * ln( nm/nk ) + (k+0.5) * ln( nk*r/(k+1) ) - fc( k ) - fc( n - k ) ) {
				return k;
			} else {
				goto = 1;
			}
		break;
		}
	}
}

module.exports = random;
