$(document).on("click", ".burger, .burger-close", function() {
    if($(this).hasClass("burger")) {
        $(this).closest(".menu").addClass("active");
        $("body").addClass("locked");
        $("body").css("padding-right", `${getScrollbarWidth()}px`);
    } else if ($(this).hasClass("burger-close")) {
        $(this).closest(".menu").removeClass("active");
        $("body").removeClass("locked");
        $("body").css("padding-right", "");
    }
});

(function($){
    $(window).on("load", function() {
        $(".js-custom-scrollbar-dark").mCustomScrollbar({
            axis:"y",
            theme:"dark-3",
            scrollButtons:{
                enable:true
            }
        });
        $(".js-custom-scrollbar-light").mCustomScrollbar({
            axis:"y",
            theme:"light-3",
            scrollButtons:{
                enable:true
            }
        });
    });
    
})(jQuery);

$(window).on('resize', function() {
    $('.scrollable-content').mCustomScrollbar('update');
});

$(".js-dropdown").on("click", function(e) {
    e.preventDefault();
    $(this)
        .toggleClass("is-opened")
        .next().slideToggle(500);
});

$(".add-more").on("click", function () {
    let text = $(this).text();
    $(this)
        .text(text == "More..." ? "Less..." : "More...")
        .parent().find(".categories__link.hidden").fadeToggle(500);
});

let slider = document.getElementById('slider');
let nouisliderInstance;

function createSlider() {
  nouisliderInstance = noUiSlider.create(slider, {
      start: [4],
      connect: true,
      range: {
          'min': 4,
          'max': 6
      },
      step: 1,
      direction: 'rtl',
      connect:'upper',
  });
}

function updateSliderRange(min, max) {
    nouisliderInstance.updateOptions({
        range: {
        'min': min,
        'max': max
        }
    });
}

createSlider();

var mediaQuery = window.matchMedia('(max-width: 768px)');

function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
        // Change min and max values for smaller viewport
        updateSliderRange(1, 3);
    } else {
        // Restore original min and max values
        updateSliderRange(4, 6);
    }
}

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery); // Call the handler initially

slider.noUiSlider.on('update', function(values, handle) {
    var numColumns = parseInt(values[handle]);
    var columnWidth = 100 / numColumns - 1 + '%';
    
    var productGrid = document.querySelector('.products-list');
    productGrid.style.gridTemplateColumns = 'repeat(' + numColumns + ', ' + columnWidth + ')';
});

const CLASS_LIST = {
    MODAL: "modal",
    MODAL_ACTIVE: "modal--active",
    MODAL_DIALOG: "modal__dialog",
    TRIGGER_OPEN: "js-modal-open",
    TRIGGER_CLOSE: "js-modal-close"
};

const showScroll = (event) => {
    if (event.propertyName === "opacity") {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "visible";
        event.target
            .closest(`.${CLASS_LIST.MODAL}`)
            .removeEventListener("transitionend", showScroll);
    }
};

document.addEventListener("click", (event) => {
    //open
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const modalId = target.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.style.overflow = "hidden";

        modal.classList.add(CLASS_LIST.MODAL_ACTIVE);
    }

    //close
    if (
        event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
        (event.target.closest(`.${CLASS_LIST.MODAL}`) != null &&
            event.target
                .closest(`.${CLASS_LIST.MODAL}`)
                .classList.contains(CLASS_LIST.MODAL_ACTIVE) &&
            !event.target.closest(`.${CLASS_LIST.MODAL_DIALOG}`))
    ) {
        event.preventDefault();
        const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);
        modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
        modal.addEventListener("transitionend", showScroll);
    }
});

const getScrollbarWidth = () => {
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

$('.filter-form__select').select2({
    width: "100%",
});

$(".accordion__header").on("click", function() {
    $(this)
        .parent().toggleClass("active")
        .end()
        .next().slideToggle(300)
});

let mixer = mixitup(".products-list");