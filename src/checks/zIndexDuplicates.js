'use strict';

// check for z-index values that are duplicated elsewhere
module.exports = function deDupeZIndex() {
	var arr = this.cache.line.split(/[\s\t,:]/);
	var context = this.getContext(this.config.indentSpaces, this.cache.line);
	var isItADupe = false;

	this.cache.zCache.forEach(function( val, i ) {
		if ( this.cache.zCache[i][0] === arr[ arr.length - 1 ] && context === this.cache.zCache[i][1] ) {
			isItADupe = true;
		}
	});

	this.cache.zCache.push( [ arr[ arr.length - 1 ], context ] );

	if ( isItADupe === true ) {
		this.cache.warnings.push(  'this z-index value is already being used elsewhere' + '\nFile: ' + this.cache.file + '\nLine: ' + this.cache.lineNo + ': ' + this.cache.line.trim() );
	}

	return isItADupe;
};