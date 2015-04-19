'use strict';

// check that quote style is consistent with config
module.exports = function checkQuoteStyle() {
	var line = this.cache.line; // convenience
	var quotePref = this.config.quotePref; // convenience
	var badQuotes = false;

	// check if ' or " is present on the line at all
	if ( line.indexOf("'") === -1 &&
		line.indexOf('"') === -1 ) {
		return badQuotes;
	}

	// if '' quotes preferred and "" quotes are on the line
	if ( quotePref === 'single' && line.indexOf('"') !== -1 ) {
		badQuotes = true;

		// "" are still allowed if used inside '', so we have to check that
		if ( line.match(/('.*')+/) && // cant do [1] on something thats undefined
			line.match(/('.*')+/)[1].match(/(".*")+/) ) {
			// if "" is on the line but isn't inside '', we got bad quotes
			badQuotes = false;
		}
	}
	// if "" quotes preferred and '' quotes are on the line
	else if ( quotePref === 'double' && line.indexOf("'") !== -1 ) {
		badQuotes = true;

		// '' are still allowed if used inside "", so we have to check that
		if ( line.match(/(".*")+/) && // cant do [1] on something thats undefined
			line.match(/(".*")+/)[1].match(/('.*')+/) ) {
			// if "" is on the line but isn't inside '', we got bad quotes
			badQuotes = false;
		}
	}

	if ( badQuotes === true ) {
		cache.warnings.push( 'preferred quote style is ' + quotePref + ' quotes' + '\nFile: ' + this.cache.file + '\nLine: ' + this.cache.lineNo + ': ' + this.cache.line.trim() );
	}

	return badQuotes;
};