document.addEventListener('DOMContentLoaded', () => {
    // Enhanced observer with multiple thresholds
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Add stagger delay for child elements
                const children = entry.target.querySelectorAll('h3, p, img, .project-stack');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('fade-in-up');
                });
            } else {
                entry.target.classList.remove('animate');
                // Remove fade-in-up from children
                const children = entry.target.querySelectorAll('h3, p, img, .project-stack');
                children.forEach(child => {
                    child.classList.remove('fade-in-up');
                });
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .front-page-identity, .front-page-identity h1, .front-page-identity h2, .front-page-identity .icons,
        .front-page-nav, .front-page-nav li,
        .left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons,
        #about-me, #about-me h2, #about-me p,
        .portfolio-project-case, .title-projects-animation, .projectsMAINtitle, .repo-projects,

        .main-vertical-line, .vertical-line
    `);

    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.2) {
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
        
        // Close menu when clicking on menu items
        const menuItems = dropdownMenu.querySelectorAll('.dropmenu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                dropdownMenu.style.display = 'none';
            });
        });
    }
});
