document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Array of gradients for each section
    const sectionGradients = {
        'about': 'linear-gradient(to right, #24243e, #3a0a6d, #0f0c29)',
        'projects': 'linear-gradient(to right, #451b6e, #7a3e8d, #3c1a5b)',
        'contact': 'linear-gradient(to right, #1d0f3c, #1a0b3c)'
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add `is-visible` class to fade in the section
                entry.target.classList.add('is-visible');

                // Update the active navigation link
                const targetId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });

                // Change the body background to the corresponding gradient
                document.body.style.backgroundImage = sectionGradients[targetId];
            } else {
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
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});