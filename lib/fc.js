'use strict';

// FUNCTIONS //

var pow = Math.pow;


// FUNCTION CORRECTION //

/**
* FUNCTION fc( k )
*	Correction for Stirling approximation.
*
* @param {Number} k - input argument
* @return {Number} correction term
*/
function fc( k ) {
	switch ( k ) {
	case 0: return 0.08106146679532726;
	case 1: return 0.04134069595540929;
	case 2: return 0.02767792568499834;
	case 3: return 0.02079067210376509;
	case 4: return 0.01664469118982119;
	case 5: return 0.01387612882307075;
	case 6: return 0.01189670994589177;
	case 7: return 0.01041126526197209;
	case 8: return 0.009255462182712733;
	case 9: return 0.008330563433362871;
	default: return (1/12 - (1/360 -1/1260/pow( k + 1, 2 ) ) / ( pow( k + 1, 2 ) ) ) / ( k + 1 );
	}
} // end FUNCTION fc()


// EXPORTS //

module.exports = fc;
