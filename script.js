document.addEventListener('DOMContentLoaded', () => {


    // Generic IntersectionObserver setup for animate class
    const observeElements = (elements, threshold = 0.4, className = 'animate') => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                entry.target.classList.toggle(className, entry.isIntersecting);
            },
            { threshold }
        );
        elements.forEach(element => observer.observe(element));
    };

    // Vertical lines animation
    observeElements(document.querySelectorAll('.main-vertical-line, .vertical-line'));

    // About Me section animation
    observeElements(document.querySelectorAll(
        ".left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons, #about-me, #about-me h2, #about-me p"
    ), 0.7);

    // Project cases animation
    observeElements(document.querySelectorAll(
        ".portfolio-project-case, .title-projects-animation, .projectsMAINtitle, .post-it-note, #contact-para, .contact-title, .form-field"
    ), 0.7);

    // Front page identity and nav animation (restart animation on 50% visibility)
    const observerRestart = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animation-restart');
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.5 });

    observerRestart.observe(document.querySelector('.front-page-identity'));
    observerRestart.observe(document.querySelector('.front-page-nav'));
    

    // Hamburger menu toggle ======================================================================================
    const menuToggle = document.getElementById('menu-toggle-button');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', (event) => {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
    

});
