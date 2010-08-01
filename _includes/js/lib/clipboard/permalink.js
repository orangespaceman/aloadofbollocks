/**
 * @fileoverview Insert permalinks
 *
 * Requires clipboard - ZeroClipboard.js
 * 
 * @author PG @ Pirata [piratalondon.com]
 * 
 */
var Permalinks = function(){
		
	/*
	 * Zero clipboard
	 */
	var clip = null;
	
	
	/*
	 * The permalink element
	 *
	 * @var Object
	 * @private
	 */
	var permalinkElements = [];
	

	/**
	 * Initialise the functionality
	 * @param {Object} options The initialisation options
	 * @return void
	 * @public
	 */
	var init = function() {
				
		// create 'copy to clipboard' functionality
		createPermalinkFunctionality();
		
	};

	
	/*
	 * Add clipboard functionality
	 *
	 * @return void
	 * @private	
	 */
	var createPermalinkFunctionality = function(el) {
	
		ZeroClipboard.setMoviePath( './_includes/js/lib/clipboard/ZeroClipboard.swf' );
		
		clip = new ZeroClipboard.Client();
		clip.setHandCursor( true );
		clip.setCSSEffects( true );

		clip.addEventListener('load', function (client) {
		//	console.log("Flash movie loaded and ready.");
		});
		
		if (!el) {
			el = 'div.bomb div.bomb-view';
		}
		
		// add link
		$(el).each(function(counter){
			$this = $(this);
			var url = $this.find('p').text();
			
			var copyToClip = $this.find('a.copy-to-clip');
			if (copyToClip.length < 1) {
				copyToClip = $('<li class="last"><a class="copy-to-clip" href="'+url+'">Copy to clipboard</a></li>');
				copyToClip.appendTo($this.find('ul'));
				$this.find('li.first.last').removeClass('last');

				// create tick
				var tick = $('<span class="permalink-tick"><img src="./_includes/img/site/generic-icon-tick copy.gif" alt="Copied!" /></span>').css({opacity:0});
				$this.find('a.copy-to-clip').append(tick);
			}
		});
		
		
		// enable link
		$("a.copy-to-clip").bind('mouseover', function(e) {
			
			//e.preventDefault();
			clip.setText( $(this).attr('href') );

			// reposition the movie over our element
			// or create it if this is the first time
			if (clip.div) {
				clip.receiveEvent('mouseout', null);
				clip.reposition(this);
			}
			else clip.glue(this);

			// gotta force these events due to the Flash movie
			// moving all around.  This insures the CSS effects
			// are properly updated.
			clip.receiveEvent('mouseover', null);

		});
		

		// add an event handler which fires after text is copied to the clipboard
		// and change the color of the underlying DOM element
		clip.addEventListener('complete', function(client, text) {
			var div = client.domElement;
			//console.log("Copied text to clipboard: " + text );

			// clipboard copied, show a tick, then fade it out slowly...
			showTick(div);
        });

        clip.reposition();
	};
	
	
	/*
	 * Show a little tick once the permalink has been copied, then fade it out slowly...
	 */
	var showTick = function(el) {
		
		// wait, then fade the tick out
		$(el).find('span.permalink-tick').css({opacity:1}).delay(500).animate({ opacity:0 }, 1500);
	};
	
	
	/**
	 * Return value, expose certain methods above
	 */
	return {
		init: init,
		createPermalinkFunctionality: createPermalinkFunctionality
	};
}();


/*
 * Example call:

 $(document).ready(function(){
	 
	TBC

  });

 */