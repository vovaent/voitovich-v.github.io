/* -== Imports ==- */
import $ from 'jquery';
import 'slick-carousel';

/* -== App ==- */
$(document).ready(() => {
    console.log('main-app')
});

$('.page-primary-carousel, .double-section_slider, .brands-slider').slick({
    slidesToShow: 1,
    dots: false,
    arrows: true,
    fade: true
});

$('.product-slid-content').slick({
    slidesToShow: 4,
    dots: false,
    arrows: true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 730,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.duble-slider-section').slick({
    slidesToShow: 2,
    dots: false,
    arrows: true,
    infinite: false,
    responsive: [{
        breakpoint: 730,
        settings: {
            slidesToShow: 1
        }
    }]
});

$('.primary-sub_menu').slick({
    slidesToShow: 14,
    dots: false,
    arrows: true,
    infinite: false,
    responsive: [{
            breakpoint: 1440,
            settings: {
                slidesToShow: 9
            }
        },
        {
            breakpoint: 1024,
            settings: "unslick"
        }
    ]
});

$('.single-image-slider').slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
    infinite: false,
    fade: true
});


/* ==== Click primary menu item ==== */

$('.primary-menu > li').on('click', function () {
    $(this).toggleClass('selected').children('.primary-sub_menu').toggleClass('open');
    $('.primary-header').toggleClass('header-white');
});

$('.primary-menu > li').find('.primary-sub_menu').parent('li').addClass('has_primary-sub_menu')

$('.menu-toggle--burger').on('click', function () {
    $(this).toggleClass('open');
    $('.primary-menu').toggleClass('open');
});

/* ==== Toggle rotate select arrow ==== */
const select = document.querySelector('.product-selection--select'),
    arrow = document.querySelector('.product-selection--arrow');
let selectEvent;

select.addEventListener('blur', () => selectEvent());
select.addEventListener('click', () => selectEvent());

selectEvent = () => {
    if (arrow.classList.contains('open')) {
        arrow.classList.remove('open');
    } else {
        arrow.classList.add('open');
    }
    if (event.type == 'blur') {
        select.classList.remove('change');
    }
};