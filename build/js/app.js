$(window).on("load", function() {
  $(document).on( "click", ".language-btn", function() {
    $(this).parent().toggleClass("is-opened");
    return false;
  });

  $(".language-dropdown").mCustomScrollbar();
});