!function($) {
  var toggleClass = '.dropdown-toggle', dropdownMenuClass = '.dropdown-menu';

  var init = function() {
    $(document)
      .on('click.townstage.dropdown', toggleClass, toggle)
      .on('click.townstage.dropdown', hide);
  };

  var toggle = function(e) {
    var $parent = $(this).parent();
    if ($parent.hasClass('open')) {
      $parent.removeClass('open');
    } else {
      $parent.addClass('open');
    }
    return false;
  };

  var hide = function() {
    $(dropdownMenuClass).each(function() {
      var $parent = $(this).parent();  
      if ($parent.hasClass('open')) {
        $parent.removeClass('open');
      }
    });
  };

  $(init);
}(jQuery);
