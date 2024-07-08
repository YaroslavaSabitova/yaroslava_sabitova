export default function () {
    window.addEventListener('scroll', () => {
        const buttonUp = document.querySelector('.js_button_up');

        if (window.scrollY > 100) {
            buttonUp.classList.add('showed');
        } else {
            setTimeout(() => buttonUp.classList.remove('showed'), 300);
        }
    });
}
