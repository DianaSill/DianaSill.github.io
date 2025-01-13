document.addEventListener('DOMContentLoaded', () => {

    const verticalLine = document.querySelector('.main-vertical-line');

    // state for vertical line
    setTimeout(() => {
        verticalLine.classList.add('visible'); // show after delay
    }, 500);

    const menuToggle = document.getElementById('menu-toggle-button');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', () => {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });

        document.addEventListener('click', (event) => {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    //testing

});
