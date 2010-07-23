/**
 * This adds a midi file
*/
var addMidi = {

	/*
	 * initialisation function
	 */
			init: function(src, id) {

				//get the body element
				var body = document.getElementsByTagName("body")[0];

				//create the new html element
				var midifile = document.createElement('embed');
				midifile.src = src;
				midifile.id = id;
				midifile.width = "144";
				midifile.height = "60";
				midifile.setAttribute('autostart', 'true');
				midifile.setAttribute('loop', 'true');
				midifile.setAttribute('hidden','true');
				
				//add the new html element to the document
				body.appendChild(midifile);

			}
}
