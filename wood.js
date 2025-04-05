document.addEventListener('DOMContentLoaded', () => {

    // --- AOS (Animate On Scroll) Initialization ---
    AOS.init({
        duration: 800, // Animation duration
        once: true, // Whether animation should happen only once - while scrolling down
        offset: 100, // Offset (in px) from the original trigger point
    });

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    const stickyOffset = header.offsetTop + 100; // Start applying sticky slightly after scroll

    function handleScroll() {
        if (window.pageYOffset > stickyOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Optional: Highlight active nav link based on scroll position
        // (More complex logic needed here to check section visibility)
    }

    // We don't have a .sticky class defined yet, let's add it to CSS:
    /* Add this to your CSS:
    #main-header.sticky {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        background-color: rgba(255, 255, 255, 0.98); / Slightly transparent maybe /
        backdrop-filter: blur(5px); / Optional nice effect /
    }
    */
   // Actually, the header is already fixed, so 'sticky' logic isn't needed in this setup.
   // If you wanted it to only become fixed *after* scrolling, you'd change position:fixed to position:absolute
   // initially and then toggle to position:fixed with the 'sticky' class.
   // For now, we'll just keep it fixed. window.addEventListener('scroll', handleScroll);


    // --- Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (good for single-page sites)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }


    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxPrice = document.getElementById('lightbox-price');
    const closeBtn = document.querySelector('.lightbox-close');
    const woodArtLinks = document.querySelectorAll('.woodart-link');

    if (lightbox && closeBtn && woodArtLinks.length > 0) {
        woodArtLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior

                // Get data from the clicked link's attributes
                const imgSrc = link.getAttribute('href');
                const title = link.getAttribute('data-title');
                const description = link.getAttribute('data-description');
                const price = link.getAttribute('data-price');

                // Populate the lightbox
                lightboxImg.src = imgSrc;
                lightboxTitle.textContent = title || '';
                lightboxDescription.textContent = description || '';
                lightboxPrice.textContent = price || '';

                // Display the lightbox
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close the lightbox when the close button is clicked
        closeBtn.addEventListener('click', () => {
            closeLightbox();
        });

        // Close the lightbox when clicking outside the image/caption area
        lightbox.addEventListener('click', (e) => {
            // Close only if clicked directly on the dark background overlay
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxImg.src = ''; // Clear image source
            document.body.style.overflow = ''; // Restore background scrolling
        }

        // Also close lightbox with Escape key
         document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                closeLightbox();
            }
        });

        // Make the "Inquire" button inside the lightbox close the modal too
        const inquireButton = document.querySelector('.lightbox-inquire');
        if (inquireButton) {
            inquireButton.addEventListener('click', () => {
                closeLightbox();
                // The link will then navigate to the #contact section
            });
        }

    } else {
        console.warn('Lightbox elements not found or no wood art links present.');
    }


    // --- Dynamic Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded
