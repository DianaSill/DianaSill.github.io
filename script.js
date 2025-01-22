document.addEventListener('DOMContentLoaded', () => {


    const observeElements = (elements, threshold = 0.4) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element enters the viewport: Add the animation class and reset animation
                    entry.target.classList.add('animate');
                    
                    // Temporarily remove the animation to reset it
                    entry.target.style.animation = 'none';
                    
                    // Trigger reflow (forces the browser to recalculate styles)
                    entry.target.offsetHeight; // force the element to reflow
                    
                    // Reapply the animation
                    entry.target.style.animation = ''; // Reapply the animation
    
                } else {
                    // Element leaves the viewport: Remove the animation class
                    entry.target.classList.remove('animate');
                }
            });
        }, { threshold });
    
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * threshold) {
                element.classList.add('animate');
            }
            observer.observe(element);
        });
    };
        
    observeElements(document.querySelectorAll('.front-page-identity, .front-page-identity h1, .front-page-identity h2, .front-page-identity .icons'));
    
    observeElements(document.querySelectorAll('.front-page-nav, .front-page-nav li'));
    
    observeElements(document.querySelectorAll(
        ".left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons, #about-me, #about-me h2, #about-me p"
    ));
    
    observeElements(document.querySelectorAll(
        ".portfolio-project-case, .title-projects-animation, .projectsMAINtitle, .repo-projects, .post-it-note, #contact-para, .contact-title, .form-field"
    ));
    
    observeElements(document.querySelectorAll('.main-vertical-line, .vertical-line'));
    
  

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
