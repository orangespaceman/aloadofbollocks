/*
 * footnote links cycles through the links from an html page, 
 * and puts these at the foot of the printed page
 * 
 */
var printFootnoteLinks = { 

	/*
	 * function runs on page load, collecting links and running sub-functions to check validity
	 *
	 * @param string containerID Id of the container within which to collect all links
	 * @param string targetID Id of the container to append complete link list to
	 * 
	 * @return void  
	 */
	init: function(containerID,targetID) {
		

		//get container object 
		var container = document.getElementById(containerID);
		//var container = document.getElementsByTagName(containerID)[0];
		
		//get all link tags from the container
		var linkArray = container.getElementsByTagName('a');

		//create an array to contain all unique links
		var uniqueLinkArray = [];

		//create an ordered list to display all unique links
		var ol = document.createElement('ol');


		//cycle through all links
		for (var i=0; i<linkArray.length; i++) {

			//test link validity
			var validlink = this.testLinkValidity(linkArray[i]);

			//if link is valid add to footer
			if (validlink) {
				this.addLink(linkArray[i], uniqueLinkArray, ol);
			}
		}

		//finished cycle through links, so print them
		this.printLinks(ol, targetID);
		
		return this;
	},

	
	/*
	 * function to test whether a link should be included in the page footer
	 *
	 * @param object currentLink The current link object
	 * 
	 * @return boolean whether the current link is valid and should be added
	 */
	testLinkValidity: function(currentLink) { 
	
		//if current element has a link url, and has not been told to be ignored
		if (currentLink.getAttribute('href') == false || currentLink.getAttribute('cite') == false || currentLink.className.indexOf("ignore") != -1 ) { 
			return false;
		}
		
		//if current element is the child of an element that has been requested as hidden - add classes per project as applicable
		if (currentLink.parentNode.className.indexOf('hideforprint') != -1) {
			return false;
		}
						
		//get the url of the link
		var thisLink = currentLink.getAttribute('href') ? currentLink.href : currentLink.cite;

		//get the current page location
		var currentURL = document.location.href;
		
		if (!thisLink) {
			return false;
		}
		
		//check if the link is to the current page, if so do not display it
		if (thisLink.indexOf("#") != -1) {
			
			var thisLinkURL = thisLink.split('#');
			if (thisLinkURL[0] == currentURL) { 
				return false;
			}
		}
		
		//if link passes all of the above tests, it is valid
		return true;
	},


	/*
	 * function to take a new link and append it to the current list of links
	 *
	 * @param object currentLink the current link object
	 * @param array uniqueLinkArray an array of unique links
	 * @param object ol html element containing list of unique links
	 *
	 * @return void
 	 */
	addLink: function(currentLink, uniqueLinkArray, ol) {
			
			var thisLink = currentLink.href;
			
			if (currentLink.href.indexOf("mailto:") != -1) {
				thisLink = "Email: " + thisLink.substring(7);
			}		

			//create inline span element to contain link ref number
			var note = document.createElement('span');
			note.className = "printonly";
			
			//check if current link has already been collected
			var linkExists = this.arrayContainsValue(uniqueLinkArray, thisLink);

			var note_txt = null;

			//if the link is already in the array
			if (linkExists === false){

					//create list element
					var li = document.createElement('li');
					
					//create text to go inside list element 
					var li_txt = document.createTextNode(thisLink);
																			
					//put text within list element
					li.appendChild(li_txt);
					
					//put list element within ordered list
					ol.appendChild(li);
					
					//put the latest link into the array
					uniqueLinkArray.push(thisLink);
					
					//create variable to contain the number relating to the link url
					note_txt = document.createTextNode(uniqueLinkArray.length);

			// if the link is not already in the array
			} else { 
				
					//create variable to contain the number relating to the link url
					note_txt = document.createTextNode(linkExists+1);

			}
	
			//put the number of the current link / url within the span element
			note.appendChild(note_txt);
			currentLink.appendChild(note);
	},


	/*
	 * append final list of links to the target container
	 * @param object ol html element containing links list
	 * @param string targetID container id to append links list to
	 *
	 * @return void
	 */
	printLinks: function (ol, targetID) {

		var opendiv	= document.createElement('div');
		opendiv.className = 'printonly listlinks clearfix';

		//the target of where to append the printed links
		var target = document.getElementById(targetID);
		target.appendChild(opendiv);

		//create the h2 under which all links are placed
		var h2 = document.createElement('h2');
		var h2_txt = document.createTextNode('Links');
		h2.appendChild(h2_txt);

		opendiv.appendChild(h2);
		opendiv.appendChild(ol);
	},
	
	
	/*
	 * Check an array for a value
	 */
	arrayContainsValue: function(arrayName, value) {
		for(x=0; x<arrayName.length; x++) {
			if(arrayName[x]==value) {
				return x;
			}
			return false;
		}
		return false;
	}
};