document.addEventListener('DOMContentLoaded', () => {
    // Select all the full-screen sections
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Create an observer to check when a section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is intersecting the viewport, add the 'is-visible' class
                entry.target.classList.add('is-visible');
            } else {
                // Otherwise, remove the class to fade it out
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Update the active navigation link based on the current section
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 2) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Initially highlight the 'About' link on load
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#about') {
            link.classList.add('active');
        }
    });
});
