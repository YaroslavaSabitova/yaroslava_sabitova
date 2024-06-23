export default function () {
    const colorStep = 1.5;
    let colorResultHSL = 223;
    let curentScroll = 0;

    function changeColor() {
        let scrollTop = window.scrollY;
        const delta = scrollTop - curentScroll;

        if (delta > 0) {
            colorResultHSL += colorStep;
            if (colorResultHSL >= 360) {
                colorResultHSL = 0;
            }
        } else {
            if (scrollTop === 0) {
                colorResultHSL = 223;
            } else {
                colorResultHSL -= colorStep;
            }

            if (colorResultHSL <= 0) {
                colorResultHSL = 360;
            }
        }

        document.body.setAttribute(
            'style',
            `background-color: hsl(${colorResultHSL}deg 100% 18%);`
        );

        curentScroll = scrollTop;
    }

    window.onscroll = changeColor;
}
