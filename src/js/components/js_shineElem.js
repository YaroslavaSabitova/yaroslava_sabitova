export default function () {
    const shineContainer = document.querySelector('.js_shine-container');
    const shineElement = document.querySelector('.js_shine-element');

    shineContainer.addEventListener('mousemove', event => {
        shineElement.classList.add('active');

        const rect = shineContainer.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        shineElement.style.left = `${x}px`;
        shineElement.style.top = `${y}px`;
    });

    shineContainer.addEventListener('mouseout', () => {
        shineElement.classList.remove('active');
    });
}
