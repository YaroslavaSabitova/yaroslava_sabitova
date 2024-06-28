export default function () {
    const menu = document.querySelector('.js_menu');
    const burgerBtn = document.querySelector('.js_burger');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('menu-open');
        menu.classList.toggle('menu-open');

        if (menu.classList.contains('menu-open')) {
            document.body.setAttribute('style', 'overflow: hidden');
        } else {
            document.body.removeAttribute('style');
        }
    });
}
