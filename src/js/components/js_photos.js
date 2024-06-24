export default function () {
    const title = document.querySelector('.js_title');
    const photoLeft = document.querySelector('.js_photo_1');
    const photoRight = document.querySelector('.js_photo_2');

    function move() {
        const incrementer = window.scrollY;

        title.style.bottom = 12 + incrementer * 0.1 + '%';

        photoLeft.style.bottom = 60 + incrementer * 0.16 + '%';
        photoLeft.style.left = 0 + incrementer * -0.2 + '%';

        photoRight.style.bottom = 60 + incrementer * 0.16 + '%';
        photoRight.style.right = 0 + incrementer * -0.2 + '%';
    }

    window.addEventListener('scroll', move);
}
