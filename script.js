document.addEventListener('DOMContentLoaded', () => {
    // Single observer for all animated elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('animate', entry.isIntersecting);
        });
    }, { threshold: 0.4 });

    // Observe all animated elements at once
    const animatedElements = document.querySelectorAll(`
        .front-page-identity, .front-page-identity h1, .front-page-identity h2, .front-page-identity .icons,
        .front-page-nav, .front-page-nav li,
        .left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons,
        #about-me, #about-me h2, #about-me p,
        .portfolio-project-case, .title-projects-animation, .projectsMAINtitle, .repo-projects,
        #contact-para, .contact-title, .contact-link,
        .main-vertical-line, .vertical-line
    `);

    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.4) {
            element.classList.add('animate');
        }
        observer.observe(element);
    });

    // Hamburger menu toggle
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
