document.addEventListener('DOMContentLoaded', () => {

    // vertical line animations ==============================================================================
    const verticalLines = document.querySelectorAll('.main-vertical-line, .vertical-line');

    verticalLines.forEach(verticalLine => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            },
            { threshold: 0.4 }
        );
        
        observer.observe(verticalLine);
    });

    // hamburger ==============================================================================
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

    // IntersectionObserver for About Me section ==============================================================================    
    const animatedElementsABOUT = document.querySelectorAll(".left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons");

    const observerABOUT = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                } else {
                    entry.target.classList.remove("animate");
                }
            });
        },
        {
            threshold: 0.7,
        }
    );

    // Observe each animated element
    animatedElementsABOUT.forEach((element) => {
        observerABOUT.observe(element);
    });


    // animation fade up for the project cases =======================================================================
    const animatedElements = document.querySelectorAll(".portfolio-project-case, .title-projects-animation, .projectsMAINtitle");

    const observer1 = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                } else {
                    entry.target.classList.remove("animate");
                }
            });
        },
        {
            threshold: 0.7,
        }
    );

    // Observe each animated element
    animatedElements.forEach((element) => {
        observer1.observe(element);
    });


    // Both the front-page-identity and front-page-nav elements =================================================

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the element is in view
            if (entry.isIntersecting) {
                // Add the class to trigger the animation again
                entry.target.classList.add('animation-restart');
                // Optionally stop observing the element once it's in view
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger the animation when the element is 50% in view
    });

    // Select the elements to observe
    const frontPageIdentity = document.querySelector('.front-page-identity');
    const frontPageNav = document.querySelector('.front-page-nav');

    observer.observe(frontPageIdentity);
    observer.observe(frontPageNav);


});
