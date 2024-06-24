export default function () {
    const title = document.querySelector('.js_title');
    const cloudLeft = document.querySelector('.js_cloud_left');
    const cloudRight = document.querySelector('.js_cloud_right');

    function move() {
        const incrementer = window.scrollY;

        title.style.bottom = 12 + incrementer * 0.1 + '%';

        cloudLeft.style.bottom = 60 + incrementer * 0.16 + '%';
        cloudLeft.style.left = 0 + incrementer * -0.2 + '%';

        cloudRight.style.bottom = 60 + incrementer * 0.16 + '%';
        cloudRight.style.right = 0 + incrementer * -0.2 + '%';
    }

    window.addEventListener('scroll', move);
}
