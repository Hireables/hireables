if($('meta[name="env"]').data('env') === "production") {
  $(document).on('ready turbolinks:load', function() {
    ga('create', $('meta[name="google-analytics"]').data('key'), 'auto');
    ga('send', 'pageview');
    _gs('track');
  });
}
