///////////////////////////////////////////////////////////////////////
// Html jQuery ShortenSelect Plugin - v1.0 - uses JavaScript, jQuery and Modernizr
//  - tested with and requires jQuery 1.7.1 and Modernizr 2.0.6
//
// Version: 1.0
// Requirements:  jQuery (v1.7.1), Modernizr (for safe use of min-width and min-height css styles)
// Author: BumbleB2na - Copyright (c) 2012 Brendan Barr
// Github: https://github.com/BumbleB2na/web-dev-suite
//
// *** You are permitted to re-use this code for your own personal or commercial use, just include this comment block ***
//
// This file is part of BumbleB2na's Web Dev Suite.
//    BumbleB2na's Web Dev Suite is free software: you can redistribute it 
//    and/or modify it under the terms of the GNU General Public License as 
//    published by the Free Software Foundation, either version 3 of the 
//    License, or (at your option) any later version.
//
//    BumbleB2na's Web Dev Suite is distributed in the hope that it will be 
//    useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with BumbleB2na's Web Dev Suite.  If not, 
//    see <http://www.gnu.org/licenses/>.
///////////////////////////////////////////////////////////////////////

/*
	Chainable jQuery function that causes a select element to stop at a certain width, shortening the text within it.
	
	///////////////////////////////////////////////////////////////////////////////////
	// Example of use:
	///////////////////////////////////////////////////////////////////////////////////
*/

/*
	options:  maxWidth
*/
(function(jQuery) {
jQuery.fn.shortenSelect = function(options) { 
	var options = options || {};
	// pass in maxWidth, constrainToContainerWidth, callbackFunc for different events
	
	var getMaxWidth = function(el) {
		// set to jQuery data value, or css max-width value
		var maxWidth = el.data('maxWidth') || el.css('max-width') || 0;
		if(parseInt(maxWidth) == 0 || maxWidth.toString() == 'auto') {   // check for 'auto' to accomodate old IE
			maxWidth = el.width() + 'px';  // default to the current width of the element
		}
		return maxWidth;
	};
	
	var shortenSelectField = function($select) {
		$.each($select.find('option'), function(key, optionElement) {
			$optionElement = $(optionElement);
			// checking if already shortened once allows a select element to be shortened/expanded multiple times, retaining the full option text
			var curText = ($optionElement.data('shortenedOnce') == undefined) ? $optionElement.text() : $optionElement.attr('title') || $optionElement.text();
			
			$optionElement.attr('title', curText);
			$optionElement.data('shortenedOnce', 'true');

			var lengthToShortenTo = (parseInt($select.css('max-width')) / 7.3);
			
			if (curText.length > lengthToShortenTo)
				$optionElement.text('... ' + curText.substring((curText.length - lengthToShortenTo), curText.length));
			else
				$optionElement.text(curText);  // all text will fit
		});
	};
	
	return jQuery(this).each(function() {
		$this = jQuery(this);
		
		// set to options.maxWidth value, or jQuery data value, or css max-width value, or set to width of element with jQuery
		// works with css min-width or width of 'px', 'em' and '%'
		if(options.maxWidth !== typeof 'undefined') {
			if(options.maxWidth === typeof 'int') {
				options.maxWidth = options.maxWidth.toString() + 'px';
			}
		}
				
		var maxWidth = options.maxWidth || getMaxWidth($this);
		
		// set max-width css style on the input field
		if(parseInt($this.css('max-width')) == 0 || $this.css('max-width').toString() == 'auto') {
			$this.css('max-width', maxWidth);
		}
		
		//var constrainToContainerWidth = options.constrainToContainerWidth || false;
				
		// manually trigger event so that shortens select field(s) contents
		shortenSelectField($this);  
	});
};
})(jQuery);