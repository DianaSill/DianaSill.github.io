document.addEventListener('DOMContentLoaded', () => {

    const verticalLine = document.querySelector('.main-vertical-line');

    // state for vertical line
    setTimeout(() => {
        verticalLine.classList.add('visible'); // show after delay
    }, 500);

});
