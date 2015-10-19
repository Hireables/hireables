if($('body').data('env') === "production") {
  $(document).on('page:change', function() {
    return _gs('track');
  });
}