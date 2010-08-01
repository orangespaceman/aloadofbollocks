/**
 * @fileoverview Form helper, to refresh content without refreshing page
 * 
 */
var formHelper = function(){

	/*
	 * Element to display an error message in
	 */
	var errorElement = null;
	
	
	/*
	 * Submission loader element
	 */
	var submitLoader = null;
	
	
	/*
	 * The submit button
	 */
	var submitButton = null;
	
	
	/*
	 * The success display
	 */
	var successArea = null;
	
	
	/*
	 * Form displayed?
	 */
	var formDisplayed = false;
	
	
	/*
	 * Add bomb link
	 */
	var addBomb = null;
	
	/*
	 * hider element
	 */
	var hider = null;
	
	/*
	 * form close button
	 */
	var formCloseButton = null;
	

	/**
	 * The options passed through to this function
	 *
	 * @var Object
	 * @private
	 */
	var options = {
		
		/**
		 * Form Element to process
		 *
		 * @var Int
		 */		
		formElement : null,
		
		/**
		 * The location of the AJAX script on the server
		 *
		 * @var String
		 */		
		ajaxPath : null
	};
	
	
	/**
	 * Initialise the functionality
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
			if (!options[option] && options[option] !== false && options[option] !== 0) {
				throw('Required option not specified: ' + option);
				//return false;
			}
		}
		
		// set up the form
		setForm();
					
		// show bomb form
		if (!addBomb) {
			addBomb = $('<p><a href="#bomb-form" class="add">Add a bomb</a></p>').prependTo("#order");
			addBomb.find('a').bind('click', function(e){
				e.preventDefault();
				if (!formDisplayed) {
					displayForm();
				}
			});
		} 
	};
	
		
	/*
	 * set up the form
	 */
	var setForm = function() {
		
		// for each required field... 
		var requiredFields = $(options.formElement).find('.required');
		$(requiredFields).each(function(counter){
			
			
			$(this)
				// not yet ready to pass validation
				.addClass('invalid')
				
				// validate as you type
				.typing({
				    stop: function () {
						if (!!formDisplayed) {
							formFieldValidityCheck($(requiredFields[counter]));
						}
					},
				    delay: 250
				})
				
				// validate after exit
				.bind('blur', function(e){
					if ($(this).val() != "" && !!formDisplayed) {
						formFieldValidityCheck($(this));
					}
				});
		});
		
		
		// detect form submit
		submitButton = $(options.formElement).find('input[type=submit]');
		submitButton.bind('click', function(e){
			e.preventDefault();
			formHasBeenSubmitted($(this));
			this.blur();
		});
	};

	

	
	/*
	 * The form has been submitted, error check all, and save if possible
	 */
	var formHasBeenSubmitted = function(el) {
	
		// condition : create loader?
		if (!submitLoader) {
			submitLoader = $('<img>').insertAfter(el).attr('src', './_includes/img/site/ajax-loader.gif');
		}
		
		submitLoader
			.css({opacity:0})
			.animate({opacity:1}, 500,
				function() {
					
					// error check the form
					var errors = errorCheckAllFormFields();

					// condition : if all is good, post!
					if (errors.length < 1) {
						save();
					} else {
						displayFormSubmissionErrors(errors);
					}
				}
			);
	};
	
	
	
	/*
	 * 
	 */
	var errorCheckAllFormFields = function() {
		
		// start error array to return
		var errors = [];
		
		// get the form
		var form = $(options.formElement);
		
		// find all 'required' form elements
		var requiredFields = form.find('.required');
		
		$(requiredFields).each(function(counter){
			if ($(this).hasClass('invalid')) {
				formFieldValidityCheck($(this));
				errors[errors.length] = this.id;
			}
		});
		
		return errors;
	};
	
	
	
	/*
	 * check each form field as it's entered
	 */
	var formFieldValidityCheck = function(el) {
		
		var parent = el.parent();
		var loader = $(parent).find('img');
		
		// condition : create loader?
		if (loader.length < 1) {
			loader = $('<img>').insertAfter(el);
		}

		// show loader
		loader
			.attr('src', './_includes/img/site/ajax-loader.gif')
			.css({opacity:0})
			.animate({opacity:1}, 500, function(){
				// error check
				_errorCheck(el, loader);
			});
	};
	
	


	/*
	 *
	 */
	var _errorCheck = function(el, loader) {
		
		var postData, response;
		
		// check what kind of validation it needs (some need to go to the backend)
		switch(el.attr('id')) {
			
			// check slug is available, and a slug
			case 'slug' : 

				postData = 'slug='+el.val()+'&method=slug';
				postData += '&random='+Math.random();

				// submit request
				response = $.post(
					options.ajaxPath, 
					postData,
					function(data, textStatus){
						
						var result = $.parseJSON(data);
						
						if (result.success == 1) {
							showFormFieldValid(el, loader);
						} else { 
							showFormFieldInvalid(el, loader, result.message);
						}
					});
			break;
			
			case "imgurl" :
			
				// check image is a gif
				
				postData = 'imgurl='+el.val()+'&method=gif';
				postData += '&random='+Math.random();

				// submit request
				response = $.post(
					options.ajaxPath, 
					postData,
					function(data, textStatus){
						
						var result = $.parseJSON(data);
						
						if (result.success == 1) {
							showFormFieldValid(el, loader);
						} else { 
							showFormFieldInvalid(el, loader, result.message);
						}
					});
			break;
			
			default :
				
				// simple error check
				if ($(el).val() != "") {
					showFormFieldValid(el, loader);
				} else { 
					showFormFieldInvalid(el, loader, "Can't be empty");
				}
				
			break;
		}
		
		// JS Lint
		return false;
	};
	
	
	/*
	 *
	 */
	var showFormFieldValid = function(el, loader) {
		loader.attr('src', './_includes/img/site/generic-icon-tick.gif');
		el.removeClass('invalid');
		
		// show error message string
		var parent = el.parent();
		var errorElement = $(parent).find('p.error');
		if (errorElement.length > 0) {
			errorElement.animate({
				opacity:0,
				marginRight:"-10px"
			}, 250);
		}
	};
	
	
	/*
	 *
	 */
	var showFormFieldInvalid = function(el, loader, error) {
		
		loader.attr('src', './_includes/img/site/generic-icon-cross.gif');
		el.addClass('invalid');
		
		// show error message string
		var parent = el.parent();
		var errorElement = $(parent).find('p.error');
		
		// condition : create error?
		if (errorElement.length < 1) {
			errorElement = $('<p />')
				.addClass('error')
				.insertAfter(el)
				.css({
					opacity:0,
					marginRight:"-10px"
				});
		}
		errorElement
			.text(error)
			.animate({
				opacity:1,
				marginRight:0
			}, 250);
	};
	
	
	
	/*
	 * 
	 */
	var displayFormSubmissionErrors = function(errors) {

		// condition : add error element?
		errorElement = $(options.formElement).find('fieldset#j-bomb-form-submit p.submit-error');
		if (errorElement.length < 1) {
			errorElement = $('<p class="submit-error" />')
			.insertAfter(submitLoader)
			.css({opacity:0});
		};
		errorElement.text('Please fix the errors marked above').animate({opacity:1}, 250);
		
		submitLoader.animate({
			opacity:0
		}, 250);
	};
	
	
	/*
	 *
	 */
	var resetForm = function() {

		// reset content
		var els = $('input.text');
		els.val('').addClass('invalid');
		
		els.each(function(counter){
			el = $(this);
			var parent = el.parent().parent();
			var loader = $(parent).find('img');

			// reset loader
			loader
				.attr('src', './_includes/img/site/ajax-loader.gif')
				.css({opacity:0});
			
			
			// reset error text
			var errorElement = $(parent).find('p.error');
			errorElement.css({
				marginRight:"-10px",
				opacity:0
			});
		});
		
		$(options.formElement).find('fieldset#j-bomb-form-submit p.submit-error').css({opacity:0});
		
	};
	
	
	/*
	 *
	 */
	var save = function() {

		// generate our post data from the form
		var postData = $(options.formElement).formSerialize();

		postData += '&method=save';

		// when submitting, declare that we want the form validated, and prevent ie caching bug
		postData += '&random='+Math.random();
		
		// submit request
		var response = $.post(
			options.ajaxPath, 
			postData,
			function(data, textStatus){
				
				var result = $.parseJSON(data);
				
				// condition : if the data has been retrieved successfully, save it
				if (result.success == 1) {
					
					hideForm(function(){
					
						bombs.addBomb(result.details, 'top');

						// update counters
						$("span#end-count").text(++bombs.counters.endCount);
						$("span#bomb-count").text(++bombs.counters.totalBombCount);
						bombs.counters.visibleBombCount++;
						
					});
						
					
					
				// an error has occurred, prepare to display it
				} else {
					console.log(result.message);
				}
				
				submitLoader.animate({
					opacity:0
				}, 250);
				
		});
	};
	
	
	/*
	 * 
	 */
	var displayForm = function() {
	
		if (!formDisplayed) {
			formDisplayed = true;
			
			if (!formCloseButton) {
				formCloseButton = $('<p id="close-form"><a href="#">x</a></p>').prependTo("#bomb-form");
				formCloseButton.bind('click', function(e){
					e.preventDefault();
					hideForm();
				});
			}
			
			if (!hider) {
				hider = $('<div id="hider" />').appendTo('body');
			}
			
			var pageHeight = $(document).height();
			
			hider.css({
				opacity:0,
				display:"block",
				height: pageHeight + "px"
			}).animate({
				opacity:1
			}, 250, function(){
				$("#bomb-form").stop().animate({
					marginTop:"-125px"
				}, 500, function(){
					$("#bomb-form input:first").focus();
				});
			});
		}
	};
	
	
	/*
	 * 
	 */
	var hideForm = function(callback) {
		if (!!formDisplayed) {
			formDisplayed = false;
			
			$("#bomb-form").stop().animate({
				marginTop:"-1000px"
			}, 500, function(){
				hider.animate({
					opacity:0
				}, 250, function(){
					hider.css({
						display:"none"
					});

					resetForm();

					if (!!callback) {
						callback();
					}
				});
			});
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
 * Below functions are extracted from the jQuery Form Plugin
 * version: 2.28 (10-MAY-2009)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};


/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
                	v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};