///////////////////////////////////////////////////////////////////////
// Html jQuery StretchField Plugin - v1.0 - uses JavaScript, jQuery and Modernizr
//  - tested with and requires jQuery 1.7.1 and Modernizr 2.0.6
//
// Version: 1.0
// Requirements:  jQuery (v1.7.1), Modernizr (for safe use of min-width and min-height css styles)
// Github: https://github.com/BumbleB2na/web-dev-suite
// Author: BumbleB2na - Copyright (c) 2012 Brendan Barr
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
	Chainable jQuery function that causes an input field to work dynamically.
	
	///////////////////////////////////////////////////////////////////////////////////
	// Example of use:
	///////////////////////////////////////////////////////////////////////////////////
*/

/*
	options:  minWidth, maxWidth
*/
(function(jQuery) {
jQuery.fn.stretchfield = function(options) { 
	var options = options || {};
	// pass in minWidth, maxWidth, minLines, maxLines, bool constrainToContainerWidth, bool constrainToContainerHeight, callbackFunc for different events
	
	var getMinWidth = function(el) {
		// set to jQuery data value, or css min-width value, or css width value, or else get width of element with jQuery
		var minWidth = el.data('minWidth') || el.css('min-width') || 0;
		if(parseInt(minWidth) == 0 || minWidth.toString() == 'auto') {   // check for 'auto' to accomodate old IE
			minWidth = (parseInt(el.css('width')) != 0) ? el.css('width') : minWidth = el.width().toString() + 'px';
			return minWidth;
		}
	};
	
	var stretchInputField = function($input, $mirror) {
		$mirror.text($input.val() + 'Di'); // adding on an extra character to the mirrored field causes the input field to stretch a little more (looks nicer)
		
		var minWidth = parseInt($input.css('min-width'));
		var mirrorWidth = $mirror.width();
		
		// prevent input field from squishing below min-width (in IE) before adjusting its width
		if(mirrorWidth > minWidth)
			$input.width(mirrorWidth);
		else
			$input.width(minWidth);
	};
	
	return jQuery(this).each(function() {
		$this = jQuery(this);
		
		// set to options.minWidth value, or jQuery data value, or css min-width value, or css width value, or else get width of element with jQuery
		// works with css min-width or width of 'px', 'em' and '%'
		if(options.minWidth !== typeof 'undefined') {
			if(options.minWidth === typeof 'int') {
				options.minWidth = options.minWidth.toString() + 'px';
			}
		}
				
		var minWidth = options.minWidth || getMinWidth($this);
		
		// set min-width css style on the input field
		if(parseInt($this.css('min-width')) == 0 || $this.css('min-width').toString() == 'auto') {
			$this.css('min-width', minWidth);
		}
		
		// set other values
		var maxWidth = options.maxWidth || undefined;
		if(maxWidth != undefined)
			$this.css('max-width', maxWidth);
		
		//var minLines = options.minLines || 1;
		//var maxLines = options.maxLines || 1;
		//var constrainToContainerWidth = options.constrainToContainerWidth || false;
		//var constrainToContainerHeight = options.constrainToContainerHeight || false;
		
		// Remove any previously created <inputmirror> element so that this jQuery plugin can safely be used more than once on the same element
		// Note: It seems as though i don't have to remove previous event handlers - those get replaced
		var $previnputmirror = $this.prev('inputmirror');
		if($previnputmirror.length > 0)
			$previnputmirror.remove();
		
		// inject a hidden <inputmirror> element before this input element that will mirror what is typed in the input box		
		var $mirror = jQuery('<inputmirror />')
				.text($this.val())
				.copyCssStyles($this.copyCssStyles())
				.css('width','')	// don't copy over width
				.hide()				// hide the <inputmirror> element
				.insertBefore($this);	// insert it before the <input> element
	
		$this.keyup(function() {
			stretchInputField(jQuery(this), $mirror);
		});
		$this.keydown(function() {
			stretchInputField(jQuery(this), $mirror);
		});
		
		// manually trigger event so that it works on existing text after a page refresh or browser back/fwd button pressed
		stretchInputField($this, $this.prev('inputmirror'));  
	});
};
})(jQuery);

(function(jQuery) {
	jQuery.fn.copyCssStyles2 = jQuery.fn.css;
	jQuery.fn.copyCssStyles = function() {
		if (arguments.length) return jQuery.fn.copyCssStyles2.apply(this, arguments);
		var attr = ['font-family','font-size','font-weight','font-style','color',
			'text-transform','text-decoration','letter-spacing','word-spacing',
			'line-height','text-align','vertical-align','direction','background-color',
			'background-image','background-repeat','background-position',
			'background-attachment','opacity','width','height','top','right','bottom',
			'left','margin-top','margin-right','margin-bottom','margin-left',
			'padding-top','padding-right','padding-bottom','padding-left',
			'border-top-width','border-right-width','border-bottom-width',
			'border-left-width','border-top-color','border-right-color',
			'border-bottom-color','border-left-color','border-top-style',
			'border-right-style','border-bottom-style','border-left-style','position',
			'display','visibility','z-index','overflow-x','overflow-y','white-space',
			'clip','float','clear','cursor','list-style-image','list-style-position',
			'list-style-type','marker-offset'];
		var len = attr.length, obj = {};
		for (var i = 0; i < len; i++) 
			obj[attr[i]] = jQuery.fn.copyCssStyles2.call(this, attr[i]);
		return obj;
	};
})(jQuery);