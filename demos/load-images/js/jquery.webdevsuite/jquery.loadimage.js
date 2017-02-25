///////////////////////////////////////////////////////////////////////
// JQUERY IMAGE PLUGINS - v1.0 - uses JavaScript and jQuery - tested with jQuery v1.7.1
//
// Requirements:  jQuery (v1.7.1)
// Author: BumbleB2na - Copyright (c) 2012 Brendan Barr
//
// Protected by MIT License - you are permitted to re-use this code for your own personal or commercial use, just include the following comments:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////

/*
	Chainable jQuery function that loads images dynamically. Works great as an image preloader.
	
	///////////////////////////////////////////////////////////////////////////////////
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
	///////////////////////////////////////////////////////////////////////////////////
*/
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