///////////////////////////////////////////////////////////////////////
// JQUERY IMAGE PLUGINS - v1.0 - uses JavaScript and jQuery - tested with jQuery v1.7.1
//
// Version: 1.0
// Requirements:  jQuery (v1.7.1)
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
//
//	Chainable jQuery function that loads images dynamically. Works great as an image preloader.
//
// Example of use - dynamically load images, fade them in, and also trigger a function when all loading has completed:
// 
// <img data-img-src="images/image1.png" style="display:none" />
// <img data-img-src="images/image2.png" style="display:none" />
// 
// $(document).ready(function() {
// 	   $('img[data-img-src]').b2_loadImages(b2_imagesLoaded).fadeIn();
// });
// 
// function b2_imagesLoaded() {
//     b2_log('images have completed loading');
// }
///////////////////////////////////////////////////////////////////////
/*
	options:  callback - function to fire when loading image(s) has completed, src - the filepath and filename
*/
(function(jQuery) {
jQuery.fn.loadImage = function(options) { 
	var options = options || {};
	
	// validate options
	if(options.callback != undefined)
		if(typeof options.callback != 'function')
			options.callback = undefined;
	if(options.src != undefined)
		if(typeof options.src != 'string')
			options.src = undefined;
	
    var numToLoad = jQuery(this).length;
    var numLoaded = 0;
    return jQuery(this).each(function() { 
	
		var curImgSRC = options.src || jQuery(this).attr('data-img-src') || undefined;
		
        if(jQuery(this).attr('src') == undefined || jQuery(this).attr('src') == '') {
			// load event must come before setting the 'src' attribute, otherwise in 
			// the case of cached images the load event may never be reached.
            jQuery(this).load(function() {
                numLoaded++;
                if(numToLoad == numLoaded && options.callback != undefined)
					options.callback();
            }).attr('src', curImgSRC);
        } else {
            // the current image's 'src' attribute was already defined so loading
			// has been skipped.
            numLoaded++;
            if(numToLoad == numLoaded && options.callback != undefined)
				options.callback();
        }
    });
};
})(jQuery);