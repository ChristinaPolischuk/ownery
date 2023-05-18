// Custom Scripts
// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('.menu')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active')
            burger.classList.add('active')
            body.classList.add('locked')
        } else {
            menu.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('locked')
        }
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            menu.classList.remove('active')
            burger.classList.remove('active')
            body.classList.remove('locked')
        }
    })
}
burgerMenu();

(function($){
    $(window).on("load",function(){
        $(".dropdown-menu").mCustomScrollbar({
            axis:"y",
            theme:"dark-3",
            scrollButtons:{
                enable:true
            }
        });
    });
    
})(jQuery);

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
