window.addEventListener('DOMContentLoaded', () => {

    /* 2. Sticky menu */

    const menu = document.querySelector('.menu');
    const about = document.querySelector('.about');
    let menuPositionFirst = menu.getBoundingClientRect().top, // Получаем позицию по оси Y меню

        aboutPosition = about.getBoundingClientRect().top, // Получаем позицию по оси Y about

        sectionHeight = menu.clientHeight; // Получаем высоту меню

    if (menuPositionFirst <= 0) { // Если позиция элемента d диапазоне от 0 до значения его высоты, тогда делаем это:

        menu.classList.add('menu_sticky'); //  Добавляем класс у выбранной ссылки

    }

    if (aboutPosition >= (0 + sectionHeight)) {

        menu.classList.remove('menu_sticky'); // Удаляем класс у выбранной ссылки

    }

    window.addEventListener('scroll', function () { // Если происходит скролл, выполнить следующее:

        let menuPositionScroll = menu.getBoundingClientRect().top, // Получаем позицию по оси Y меню

            aboutPosition = about.getBoundingClientRect().top, // Получаем позицию по оси Y about

            sectionHeight = menu.clientHeight; // Получаем высоту меню

        // console.log(menuPosition, aboutPosition);

        if (menuPositionScroll <= 0) { // Если позиция элемента d диапазоне от 0 до значения его высоты, тогда делаем это:

            menu.classList.add('menu_sticky'); //  Добавляем класс у выбранной ссылки

        }

        if (aboutPosition >= (0 + sectionHeight)) {

            menu.classList.remove('menu_sticky'); // Удаляем класс у выбранной ссылки

        }
    });


    /* MENU [Vanila JS] */

    /* 1. Highlighting a menu item depending on the visible section of the site */

    const sections = document.querySelectorAll('[data-change-menu-link-color]'); // ВЫбираем все элементы с атрибутом [data-change-menu-link-color]

    window.addEventListener('scroll', function () { // Если происходит скролл, выполнить следующее:

        for (let section of sections) { // Извлекаем циклом все элементы из выборки поочередно

            const sectionID = section.dataset.changeMenuLinkColor; // Получаем значение дата-атрибута

            let sectionPosition = document.querySelector(sectionID).getBoundingClientRect().top, // Получаем позицию по оси Y элемента из выборки

                sectionHeight = document.querySelector(sectionID).clientHeight, // Получаем высоту элемента из выборки        

                menuItemHrefSectionID = document.querySelector(`.menu__link[href="${sectionID}"]`); // Получаем пункт меню со ссылкой с [href="sectionID"]

            if (sectionPosition >= (0 - sectionHeight / 2) && sectionPosition <= sectionHeight) { // Если позиция секции в указанном диапазоне, тогда:

                menuItemHrefSectionID.classList.add('menu__link_active'); // Добавляем класс у выбранного пункта меню

            } else { // Иначе

                menuItemHrefSectionID.classList.remove('menu__link_active'); // Удаляем класс у выбранного пункта меню

            }
        }
    });



    /* 3. Hamburger menu */

    const menuLink = document.querySelectorAll('.menu__link'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuLink.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');

            let blockID = item.getAttribute('href'),
                destinationSection = document.querySelector(blockID);

            destinationSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        })
    });

    // Smooth scroll for link
    // const localLinks = document.querySelectorAll('[href^="#"]')
    const localLinks = document.querySelectorAll('[data-scroll="smooth"]');

    for (let localLink of localLinks) {
        localLink.addEventListener('click', function (e) {
            e.preventDefault();

            let blockID = localLink.getAttribute('href'),
                destinationSection = document.querySelector(blockID);

            destinationSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
});