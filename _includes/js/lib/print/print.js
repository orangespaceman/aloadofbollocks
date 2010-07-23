/**
 * @fileoverview Insert page-print functionality
 * 
 * @author PG @ Pirata [piratalondon.com]
 * 
 */
var pagePrint = function(){
	
	/**
	 * The print links this script creates
	 *
	 * @var Array
	 * @private
	 */
	var printLinks = [];
	
	/**
	 * The options passed through to this function
	 *
	 * @var Object
	 * @private
	 */
	var options = {
		
		/**
		 * HTML print element to create
		 *
		 * @var String
		 */
		element : null,
		
		/**
		 * HTML element to insert the print with
		 *
		 * @var String
		 */
		attachTo : null,
		
		/**
		 * DOM relationship between the print element and attachTo element
		 * possible options: 'parent' (for append) or 'sibling' (for insertAfter)
		 * @var String
		 */
		 relationship : 'parent',
		 
		 /**
		  * open the print window link in a new window?
		  * @var Boolean
		  */
		 newWin : false,
		
		/*
		 * track the print click with GA?
		 * @var Boolean
		 */
		trackPrint: false
	};
	
	
	/**
	 * Initialise the page print functionality
	 * @param {Object} options The initialisation options
	 * @return void
	 * @public
	 */
	var init = function(initOptions) {
		
		// save any options sent through to the intialisation script, if set
		for (var option in options) {
			if (!!initOptions[option] || initOptions[option] === false) {
				options[option] = initOptions[option];
			}
			
			// error check, if no element is specified then stop
			if (!options[option] && options[option] !== false) {
				return false;
			}
		}
		
		// find the element to attach the new print link(s) to
		var attachTo = $(options.attachTo);
		if ($(attachTo).length < 1) {
			return false;
		} else {
			
			// loop through an add a print link to each element found
			$(attachTo).each(function(counter){
				printLinks[counter] = attachElement(this, counter);
			});
		}

		// return the array of links we've just created
		return printLinks;
	};
	
	
	/**
	 * Handle click event - print the page
	 * @return {Object} el The newly created print element
	 * @private
	 */	
	var attachElement = function(attachTo, counter) {
		
		// create the new element
		var el = $(options.element);
		
		// condition : attach the element to the page in the correct place
		if (options.relationship == 'sibling') {
			$(attachTo).after(el);
		} else {
			$(attachTo).append(el);
		}
		
		// create a variable to contain the actual anchor link that will be used to detect click
		var anchor = el;
		
		// condition : if the element isn't an anchor link, find the anchor link within (for URL reuse) 
		if (!$(el).is('a')) {
			anchor = $(el).find('a');
		}
		
		// bind a handler to the event (call a function when print link is clicked)
		$(anchor).bind('click',function(e){
			handleClick(e, anchor, counter);
		});
		
		// return the newly created element
		return el;
	};
	
	
	/**
	 * Handle click event - print the page
	 * @return void
	 * @private
	 */
	var handleClick = function(e, anchor, counter) {
		
		e.preventDefault();
		anchor.blur();

		// google analytics custom call
		if (!!window.pageTracker && !!options.trackPrint) {
			var id = $(options.attachTo + ":eq("+counter+")").attr('href');
			pageTracker._trackPageview("/print/" + id);
		}
		
		// condition : open link in a new window?
		if (!!options.newWin) {
			window.open($(anchor).attr('href'),"print");
		} else {
			window.print();
		}
	};
	
	
	/**
	 * Return value, expose certain methods above
	 */
	return {
		init: init
	};
}();


/*
 * Example call:

 $(document).ready(function(){
	 
		pagePrint.init({
			element : '<li class="pa-print"><a href="#">Print</a></li>',
			attachTo : 'li.pa-email',
			relationship : 'parent' / 'sibling',
			newWin : false
		});
  });

 */