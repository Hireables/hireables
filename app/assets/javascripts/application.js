/* eslint-disable */

//= require_self
//= require components
//= require tracker
//= require js-routes
//= require turbolinks
//= require react_ujs

// Setup React in global scope
require('jquery-ujs');

function setStickyFilters() {
  if($(window).width() > 1024) {
    $(document).scroll(function(event) {
      if($(window).scrollTop() > 350 &&
          !($(document).height() - $(window).scrollTop() < 600)
        ) {
        $('.filters').addClass('sticky');
      } else {
        $('.filters').removeClass('sticky');
      }
    });
  }
}

setStickyFilters();

$(window).resize(function(event) {
  setStickyFilters();
});
