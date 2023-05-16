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

noUiSlider.create(slider, {
    start: [4],
    range: {
    'min': 1,
    'max': 4
    },
    step: 1,
    // direction: 'rtl',
    // connect: true,
    connect:'upper',
});

slider.noUiSlider.on('update', function(values, handle) {
    var numColumns = parseInt(values[handle]);
    var columnWidth = 100 / numColumns + '%';
  
    var productGrid = document.querySelector('.products-list');
    productGrid.style.gridTemplateColumns = 'repeat(' + numColumns + ', ' + columnWidth + ')';
});
