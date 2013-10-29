!function($) {
  var toggleClass = '.dropdown-toggle', dropdownMenuClass = '.dropdown-menu';

  var init = function() {
    $(document)
      .on('click.townstage.dropdown', toggleClass, show)
      .on('click.townstage.dropdown', hide);
  };

  var show = function(e) {
    var $parent = $(this).parent();
    $parent.addClass('open');
    return false;
  };

  var hide = function() {
    $(dropdownMenuClass).each(function() {
      var $parent = $(this).parent();  
      if ($parent.hasClass('open')) { return }
      $parent.removeClass('open');
    });
  };

  $(init);
}(jQuery);
