/**
 * @fileoverview Bombs - various page effects
 * 
 */
var bombs = function(){

	/*
	 * 
	 */
	var moreButton = null,
	
	/*
	 * 
	 */
	ajaxPath = null,
	
	/*
	 *
	 */
	bombTemplate = null
	
	;
	
	
	/*
	 *
	 */
	var counters = {
		limit : 10, 
		startCount : null,
		endCount : null,
		totalBombCount : null,
		visibleBombCount : null,
		orderBy : null
	};
	
	
	/* 
	 * 
	 */ 
	var initAddMoreLink = function(initOptions) {
		
		updateCounters();
		
		ajaxPath = initOptions.ajaxPath;
		
		// store a bomb for later use
		bombTemplate = $('#existing-bombs .bomb-container:first').clone(false);
		bombTemplate.find('.bomb-image img').attr('src', './_includes/img/site/ajax-loader.gif');

	};
	
	
	/*
	 * 
	 */
	var updateCounters = function() {
		
		// get bomb counts
		counters.startCount = parseInt($("span#start-count").text(), 10);
		counters.endCount = parseInt($("span#end-count").text(), 10);
		counters.totalBombCount = parseInt($("span#bomb-count").text(), 10);
		counters.orderBy = $("span#order-by").text();
		counters.visibleBombCount = counters.endCount - counters.startCount + 1;
		
		// condition : add 'more' button to the foot of the page?
		if (counters.totalBombCount > counters.endCount) {
			showMoreButton();
		}
	};
	
	
	/*
	 *
	 */
	var showMoreButton = function() {
	
		if (!moreButton) {
			moreButton = $('<p id="fetch-more-bombs"><a href="#more">Fetch more bombs</a></p>').insertAfter("#existing-bombs");

			// add listener if not already loading
			$(moreButton).find('a').bind('click', function(e){

				e.preventDefault();
				$(this).blur();

				if (!$(moreButton).hasClass('loading')) {
					$(this).addClass('loading');
					fetchMoreBombs();
				}
			});
		}
		
		$(moreButton)
			.css({visibility:"visible"})
			.animate({
			opacity:1
		}, 250);
	};
	
	
	/*
	 * 
	 */
	fetchMoreBombs = function(restart) {
		
		// GA call
		_gaq.push(['_trackPageview', '/ajax/fetch-more']);

		
		postData = 'method=retrieve';
		
		if (!!restart) {
			postData += '&start=0';
		} else {
			postData += '&start=' + counters.endCount;
		}

		postData += '&limit=' + counters.limit;
		postData += '&orderby=' + counters.orderBy;

		// prevent ie caching bug
		postData += '&random='+Math.random();
		
		// submit request
		var response = $.post(
			ajaxPath, 
			postData,
			function(data, textStatus){
				
				var result = $.parseJSON(data);
				
				// condition : if the data has been retrieved successfully, push new bombs to the page
				if (result.success == 1) {
					
					// add each bomb individually
					$(result.details).each(function(counter){
						
						// add bombs, set callback when complete
						addBomb(this, 'bottom', counter, result.details.length, function(){
							
							// update counter at the foot at the page
							counters.startCount = counters.startCount+counters.limit;
							
							if (!restart) {
								counters.endCount = counters.endCount+counters.limit;
							}
							
							counters.visibleBombCount = $('#existing-bombs .bomb-container').length;

							// condition : remove add more button?
							if (counters.endCount >= counters.totalBombCount) {
								counters.endCount = counters.totalBombCount;
								$(moreButton).animate({opacity:0}, 250, function(){
									$(this).css({visibility:"hidden"});
								});
							}
							
							$("span#end-count").text(counters.endCount);

							// remove loading icon
							$(moreButton).find('a').removeClass('loading');
							
						});
						
					});
				}
			}
		);
	};
	
	
	
	
	/*
	 *
	 */
	var addBomb = function(data, position, counter, count, callback) {
		
		// 
		var animationTime = 500;
		counter = counter || 0;
		delay = counter * animationTime;

		// duplicate an existing bomb box
		var bombBox = bombTemplate
			.clone(false)
			.attr('id', 'bomb-' + data.slug);

		bombBox.find('a').attr('href', './' + data.slug);
		bombBox.find('.bomb-image img').attr('src', data.imgurl);
		bombBox.find('h2').text(data.title);
		bombBox.find('span.bomb-dateadded').text(data.date_added);
		bombBox.find('span.bomb-views').text(data.views);
		
		bombBox.find('p.url').text(data.url);
		bombBox.find('a.copy-to-clip').attr('href', data.url);

		// condition : where to put the new bomb?
		if (position == "top") {
			$('#existing-bombs').prepend(bombBox);
		} else {
			$('#existing-bombs').append(bombBox);
		}
		
		boxHeight = bombBox.height();
		
		// add each new box, one by one
		bombBox.css({height:0}).delay(delay).animate({height:boxHeight}, animationTime, function(){
			if (counter == (count-1)) {

				if(callback) {
					callback();
				}
			}
		});
		
		Permalinks.createPermalinkFunctionality(bombBox);
		
	};
	
	
	
	/*
	 * 
	 */
	var initOrderBy = function() {
		
		var orderDate = $("li#order-date a");
		orderDate.addClass('selected');
		
		$(orderDate).bind('click', function(e){
			e.preventDefault();
			this.blur();
			
			if (!$(this).hasClass('selected') && !$("#order ul").hasClass('loading')) {
				$(this).addClass('selected');
				$(orderPopularity).removeClass('selected');
				removeCurrentBombs(this, 'date');
				$("#order ul").addClass('loading');				
			}
		});
		
		
		var orderPopularity = $("li#order-popularity a");
				
		$(orderPopularity).bind('click', function(e){
			e.preventDefault();
			this.blur();
			
			if (!$(this).hasClass('selected') && !$("#order ul").hasClass('loading')) {
				$(this).addClass('selected');
				$(orderDate).removeClass('selected');
				removeCurrentBombs(this, 'popularity');
				$("#order ul").addClass('loading');
			}
		});
	};
	
	
	
	/*
	 *
	 */
	var removeCurrentBombs = function(el, type){
		
		$($('div.bomb-container').get().reverse()).each(function(counter){
			$(this).delay(counter*250).animate({
				height:0
			}, 250, function(){
				$(this).remove();
				
				if (counter == (counters.visibleBombCount-1)) {
					$("#order ul").removeClass('loading');
					
					$("span#start-count").text("1");
					$("span#end-count").text("10");
					$("span#order-by").text(type);
					
					updateCounters();
					fetchMoreBombs('true');
					
					// condition : add 'more' button to the foot of the page?
					if (counters.totalBombCount > counters.endCount) {
						showMoreButton();
					}
				}
			});
		});
	};
	
	

	/*
	 * 
	 */
	return {
		initAddMoreLink: initAddMoreLink,
		initOrderBy: initOrderBy,
		addBomb: addBomb,
		counters: counters
	};

}();