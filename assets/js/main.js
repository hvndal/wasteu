document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after animating to only animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Lazy Loading Images (Fallback if browser doesn't support native lazy loading)
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Driver Speech Bubble Rotation
    const bubbleText = document.querySelector('.bubble-text');
    const lines = [
        "On my way!",
        "Working hard to get it delivered!",
        "Keeping our neighborhoods clean!",
        "Serving MetroWest with pride!",
        "Rain or shine, we're on the line!",
        "Another collection done! Onto the next!",
        "Your friendly neighborhood driver here!"
    ];
    let idx = 0;
    if (bubbleText) {
        setInterval(() => {
            idx = (idx + 1) % lines.length;
            bubbleText.style.opacity = 0;
            setTimeout(() => {
                bubbleText.textContent = lines[idx];
                bubbleText.style.opacity = 1;
            }, 300);
        }, 4000);
    }

    // Tonnage Turner (Odometer) logic
    const odoD1 = document.getElementById('odo-d1');
    const odoD2 = document.getElementById('odo-d2');
    const odoD3 = document.getElementById('odo-d3');
    const odoD4 = document.getElementById('odo-d4');

    let currentTonnage = 1;
    const targetTonnage = 1240;

    function updateOdometer(value) {
        const valStr = value.toString().padStart(4, '0');
        const digits = valStr.split('').map(Number);
        
        // height of each span is 42px in style.css
        if (odoD1) odoD1.style.transform = `translateY(${-digits[0] * 42}px)`;
        if (odoD2) odoD2.style.transform = `translateY(${-digits[1] * 42}px)`;
        if (odoD3) odoD3.style.transform = `translateY(${-digits[2] * 42}px)`;
        if (odoD4) odoD4.style.transform = `translateY(${-digits[3] * 42}px)`;
    }

    // Roll up animation from 1 to 1240
    function startOdometerAnimation() {
        const duration = 2500; // 2.5 seconds rollup
        const startTime = performance.now();

        function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            currentTonnage = Math.floor(ease * (targetTonnage - 1) + 1);
            updateOdometer(currentTonnage);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ticking interval once rollup completes
                setInterval(() => {
                    currentTonnage++;
                    updateOdometer(currentTonnage);
                }, 8000);
            }
        }
        requestAnimationFrame(animate);
    }

    // Initialize with a slight delay
    setTimeout(startOdometerAnimation, 600);
});
