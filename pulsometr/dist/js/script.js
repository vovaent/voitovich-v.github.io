// Карусель Tiny-Slider на чистом JS
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    center: true,
    navPosition: 'bottom',
    responsive: {
        992: {
            gutter: 30,
            nav: false,
        }
    }
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});


$(document).ready(function () {
    /* Табы jQuery */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleDetails(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.product-item__content').eq(i).toggleClass('product-item__content_active');
                $('.product-item__details').eq(i).toggleClass('product-item__details_active');
            })
        });
    };

    toggleDetails('.product-item__link-more');
    toggleDetails('.product-item__link-back');

    // Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, .modal-wrapper, #consultation').fadeIn('slow');
    });
    $('.modal__close, .overlay').on('click', function () {
        $('.overlay, .modal-wrapper, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.product-item__title').eq(i).text());
            $('.overlay, .modal-wrapper, #order').fadeIn('slow');
        })
    });

    // Validate Forms
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символов")
                },
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    minlength: jQuery.validator.format("Введите минимум {0} символов"),
                    number: "Пожалуйста, введите корректный номер."
                },
                email: {
                    required: "Пожалуйста, введите свою эл.почту",
                    email: "Неправильно введен адрес эл.почты"
                }
            }

        });
    };

    validateForms('.consultation form');
    validateForms('#consultation form');
    validateForms('#order form');

    // InputMask
    $('input[name=phone]').inputmask({ "mask": "+38 (999) 999-99-99" }); //specifying options

    // Smouth Scroll and Page Up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#promo'], a[href='#catalog']").click(function () {
        const _href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
        return false;
    });

    // WOW.js
    new WOW().init();
});