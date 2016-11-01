/* global ga _gs document */

import $ from 'jquery';

if ($('meta[name="env"]').data('env') === 'production') {
  $(document).on('turbolinks:load', () => {
    ga('create', $('meta[name="google-analytics"]').data('key'), 'auto');
    ga('send', 'pageview');
    _gs('track');
  });
}
