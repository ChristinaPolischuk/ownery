$(window).on("load", function() {
  $(document).on( "click", ".language-btn", function() {
    $(this).parent().toggleClass("is-opened");
    return false;
  });

  $(".language-dropdown").mCustomScrollbar();
  $(".mobile-menu__dropdown-inner").mCustomScrollbar();

  $(document).on( "click", ".hamburger", function() {
    if($(".mobile-menu__navitem.dropdown").hasClass("sub-open")) {
      $(".mobile-menu__navitem.dropdown").removeClass("sub-open");
    }
    if($(this).closest(".mobile-menu").hasClass("is-opened")) {
      $(this).closest(".mobile-menu").removeClass("is-opened");
      $("body").removeClass("locked");
      $("body").css("padding-right", "");
    } else {
      $(this).closest(".mobile-menu").addClass("is-opened");
      $("body").addClass("locked");
      $("body").css("padding-right", `${getScrollbarWidth()}px`);
    }
    
    return false;
  });

  $(document).on('click', '.mobile-menu__navtrigger, .mobile-menu__subtrigger', function() {
    $(this).parents('li').addClass('sub-open');
    return false;
  });
  $(document).on('click', '.mobile-menu__backtrigger', function(){
    $(this).closest('li').removeClass('sub-open');
    return false;
  });
});

function getScrollbarWidth () {
  const item = document.createElement("div");

  item.style.position = "absolute";
  item.style.top = "-9999px";
  item.style.width = "50px";
  item.style.height = "50px";
  item.style.overflow = "scroll";
  item.style.visibility = "hidden";

  document.body.appendChild(item);
  const scrollbarWidth = item.offsetWidth - item.clientWidth;
  document.body.removeChild(item);

  return scrollbarWidth;
};