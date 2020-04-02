/* Меню гамбургер на чистом JS*/
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})

// jQuery
$(document).ready(function () {

    // Modal
    $('[data-modal=call]').on('click', function () {
        $('.overlay, .modal-wrapper, #call').fadeIn('slow');
        $('#request, #thanks').fadeOut('');

    });
    $('.modal__close, .overlay').on('click', function () {
        $('.overlay, .modal-wrapper, #call, #request, #thanks').fadeOut('slow');
    });
    $('[data-modal=request]').on('click', function (e) {
        e.preventDefault();
        $('.overlay, .modal-wrapper, #request').fadeIn('slow');
        $('#call, #thanks').fadeOut('');
    });

    // InputMask
    $('input[name=phone]').inputmask({ "mask": "+38 (999) 999-99-99" });

    // Smouth Scroll and Page Up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // $("a[href='#header'], a[href='#catalog']").click(function () {
    $("a[href^='#']").click(function () {
        const _href = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
        return false;
    });

});

