export default function () {
    const menu = document.querySelector('.js_menu');
    const burgerBtn = document.querySelector('.js_burger');

    const items = document.querySelectorAll('.js_item');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('menu-open');
        menu.classList.toggle('menu-open');
    });

    items.forEach(item => {
        item.addEventListener('click', () => {
            if (burgerBtn.classList.contains('menu-open')) {
                menu.classList.remove('menu-open');
                burgerBtn.classList.remove('menu-open');
            }
        });
    });
}
