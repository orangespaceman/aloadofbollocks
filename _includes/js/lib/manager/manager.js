/**
 * Library Manager
 * 
 */

var LibMan = function(){
	
	/*
	 * String : The path to js root
	 */
	var path = null;

	
	/*
	 * Container for the debug timeout timer
	 *
	 * @var object
	 */
	var debugTimeout = null;
	
		
	/**
	 * Are we in debug mode?  
	 * (if so, output to console)
	 *
	 * @var Bool
	 */		
	var debugMode = false;
	
	
	/*
	 * Is this IE? (needs separate rules if so)
	 * See: http://dean.edwards.name/weblog/2007/03/sniff/
	 *
	 * @var Bool
	 * @private
	 */
	var isMSIE = /*@cc_on!@*/false;
	
	
	/*
	 * If this is IE, what version number is it?
	 *
	 * @var Int
	 * @private
	 */
	var vIE = (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;

	
	/**
	 * Calculates and sets the relative path to libman.js
	 *
	 * @return void  
	 */
	var _calculatePath = function() {

		// condition : is object var already set?
		if (path == null) {
			
			// get path from LibraryManager javascript include string
			//var libman = document.getElementById("libman");
			//if (!libman) return false;
			
			// if so, remove the filename before setting the path 
			//this.path = libman.src.replace(/manager\.js(\?.*)?$/,'../../');
			
			path = "/_includes/js/";
		}
	}();
	
	
	
	/*
	 * Debug
	 * output debug messages
	 * 
	 * @return void
	 * @private
	 */
	var debug = function(content) {
		if (!!this.debugMode) {
			console.log(content);
			clearTimeout(this.debugTimeout);
			this.debugTimeout = setTimeout(this.debugSpacer, 2000);
		}
	};
	
	
	
	var debugSpacer = function() {
		if (!!this.debugMode) {
			console.log("------------------------------------------------------------------------------------------------------");
		}
	};
	
	
	/*
	 * Expose methods and values
	 */ 
	return {
		path: path,
		debugMode: debugMode,
		isMSIE: isMSIE, 
		vIE: vIE,
		debug: debug
	};
}();


/*
 * Fixes - no better place... ?
 */
	// stop firebug console errors in browsers that don't support it
	if(!window.console)	 { window.console = {}; };
	if(!window.console.log) { window.console.log = function(){}; };

	// image flicker fix for IE6
	try {
	  document.execCommand('BackgroundImageCache', false, true);
	} catch(e) {}