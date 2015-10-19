//= require_self
//= require components
//= require turbolinks
//= require react_ujs

// Setup React in global scope
var React = window.React = global.React = require('react/addons');
window.$ = window.jQuery = require('jquery')
require('jquery-ujs')

if($('body').data('env') === "production") {
  $(document).on('page:change', function() {
    return _gs('track');
  });
}

