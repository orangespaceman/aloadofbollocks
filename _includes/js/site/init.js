/**
 * Site global JS file
 */



	/**
	 * on Dom ready functionality
	 */
		$(document).ready(function() {
		
			// add an extra class to the <body> element for JS-only styling
			$("body").addClass("js");
					
			// start detecting form entry
			formHelper.init({
				formElement: "#j-bomb-form",
				ajaxPath: "./_includes/php/ajax/submit/"
			});
		});


	/*
	 * Window load calls for all pages
	 */
		$(window).load(function() {
			
		});