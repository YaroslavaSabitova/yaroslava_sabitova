export default function () {
    const colorStep = 3;
    let colorResultHSL = 147;
    let currentScroll = 0;

    function changeColor() {
        let scrollTop = window.scrollY;
        const delta = scrollTop - currentScroll;

        if (delta > 0) {
            colorResultHSL += colorStep;
            if (colorResultHSL >= 360) {
                colorResultHSL = 0;
            }
        } else {
            if (scrollTop === 0) {
                colorResultHSL = 147;
            } else {
                colorResultHSL -= colorStep;
            }

            if (colorResultHSL <= 0) {
                colorResultHSL = 360;
            }
        }

        document.body.setAttribute('style', `background-color: hsl(${colorResultHSL}deg 50% 90%);`);

        currentScroll = scrollTop;
    }

    window.onscroll = changeColor;
}
