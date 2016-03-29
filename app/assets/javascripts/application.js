//= require_self
//= require components
//= require tracker
//= require turbolinks
//= require react_ujs

// Setup React in global scope
var React = window.React = global.React = require('react/addons');
window.$ = window.jQuery = require('jquery')
require('jquery-ujs')

if($(window).width() > 600) {
	$(document).scroll(function(event) {
		if($(window).scrollTop() > 300 && !($(document).height() - $(window).scrollTop() < 600)) {
			$('.filters').addClass('sticky');
		} else {
			$('.filters').removeClass('sticky');
		}
	});
}
