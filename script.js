document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Array of gradients for each section
    const sectionGradients = [
        'linear-gradient(to right, #4a90e2, #50c9c3)', // About
        'linear-gradient(to right, #7b4397, #dc2430)', // Projects
        'linear-gradient(to right, #0f0c29, #3a0a6d, #24243e)' // Contact
    ];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add `is-visible` class to fade in the section
                entry.target.classList.add('is-visible');

                // Update the active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });

                // Change the body background color to the corresponding gradient
                const sectionId = entry.target.id;
                let gradientIndex;
                if (sectionId === 'about') {
                    gradientIndex = 0;
                } else if (sectionId === 'projects') {
                    gradientIndex = 1;
                } else if (sectionId === 'contact') {
                    gradientIndex = 2;
                }
                
                if (gradientIndex !== undefined) {
                    // Update the background-image directly on the body
                    document.body.style.backgroundImage = sectionGradients[gradientIndex];
                }
            } else {
                // Remove `is-visible` class when the section is not visible
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Scroll smoothly to the target section
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});