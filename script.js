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

    // Skills section special handling
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        const delay = parseFloat(card.dataset.delay) || 0;
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, delay * 1000);
                    });
                } else {
                    entry.target.classList.remove('animate');
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    skillCards.forEach(card => {
                        card.classList.remove('animate');
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        skillsObserver.observe(skillsSection);
    }

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .front-page-identity, .front-page-identity h1, .front-page-identity h2, .front-page-identity .icons,
        .front-page-nav, .front-page-nav li,
        .left-side, .left-side h1, .left-side h2, .left-side li, .left-side .icons,
        #about-me, #about-me h2, #about-me p,
        .portfolio-project-case, .title-projects-animation, .projectsMAINtitle, .repo-projects,
        #skills h2,
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
    
    // Add skills link to desktop menu (after projects)
    const desktopMenu = document.querySelector('.left-side .menu ul');
    if (desktopMenu) {
        const desktopSkillsLink = document.createElement('li');
        desktopSkillsLink.innerHTML = '<a href="#skills" class="menu-option">Skills</a>';
        const desktopProjectsLink = desktopMenu.querySelector('a[href="#projects"]').parentElement;
        desktopProjectsLink.insertAdjacentElement('afterend', desktopSkillsLink);
    }
});

// Impact carousel - infinite loop by reordering DOM nodes
(function() {
    const list = document.querySelector('.impact-list');
    const dots = document.querySelectorAll('.impact-carousel-dots .dot');
    if (!list || !dots.length || window.innerWidth > 1024) return;

    const itemCount = dots.length;

    list.addEventListener('scroll', () => {
        const items = list.querySelectorAll('li');
        const itemWidth = items[0].offsetWidth + 16;
        const maxScroll = list.scrollWidth - list.clientWidth;

        if (list.scrollLeft >= maxScroll - 2) {
            const first = list.firstElementChild;
            list.appendChild(first);
            list.scrollLeft -= itemWidth;
        } else if (list.scrollLeft <= 2) {
            const last = list.lastElementChild;
            list.insertBefore(last, list.firstElementChild);
            list.scrollLeft += itemWidth;
        }

        // Update dots
        const visibleIdx = Math.round(list.scrollLeft / itemWidth);
        if (items[visibleIdx]) {
            const idx = parseInt(items[visibleIdx].dataset.index);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
    });
})();


// Highlight active section in mobile dropdown
(function() {
    const sections = document.querySelectorAll('section[id], div[id].content, div#impact');
    const dropItems = document.querySelectorAll('.dropmenu-item');
    if (!sections.length || !dropItems.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
        });

        dropItems.forEach(item => {
            const href = item.getAttribute('href');
            item.classList.toggle('active', href === '#' + current);
        });
    });
})();
