document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    // Function to add 'active' class to sections on scroll
    function checkSectionInView() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        // Add 'active' class to the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Function to handle the animated appearance of sections
    function handleScrollAnimation() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // If the section is in the viewport, add the 'active' class
            if (sectionTop < screenHeight - 150) {
                section.classList.add('active');
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        checkSectionInView();
        handleScrollAnimation();
    });

    // Run on page load
    checkSectionInView();
    handleScrollAnimation();
});