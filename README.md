# Web Dev Suite
A suite of jquery plugins for UI elements and image asset loading

# Tech notes
* jquery 1.7.1 is the current supported version that the plugins depend on.  
* modernizr 2.0.6+ is a dependency for some plugins for safe css checking of min-width and min-height.  

# Demos
* [text input field that grows as you type](https://mobilewebsmart.com/_sites/WebDevSuite/demos/stretching-input-plugin/stretching-input-plugin.htm)  
* [shorten text of long select input options](https://mobilewebsmart.com/_sites/WebDevSuite/demos/shorten-select/shorten-select.htm)  
* [dynamic image file loader](https://mobilewebsmart.com/_sites/WebDevSuite/demos/load-images/load-image.htm)  

# License
The GNU General Public License v3.0 - GNU Project - Free Software Foundation (FSF)  
You may use this free of charge, including commercial projects, provided that you keep the plugin files' comment block.  

# Ideas for improvements
* write Jasmine BDD test cases to test plugin code.  
* experiment with latest and oldest versions of jquery to determine what is supported.  
* seek to understand why Modernizr helps with safe css checking of min-width and min-height to see if that library can be omitted.  
* use jsperf tests to optimize js where possible.  
* create a non-jquery version of these plugins.  