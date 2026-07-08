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

    // Animated Trucks along paths with Stops & Speech Bubbles
    const routes = [
        {
            id: 'MA',
            pathId: 'routeMA',
            truckId: 'truckMA',
            bubbleTextId: 'bubbleTextMA',
            cities: [
                { name: "Framingham", ratio: 0.0, msg: "Departing Framingham Hub!" },
                { name: "Maynard", ratio: 0.5, msg: "Emptying recycling bins in Maynard!" },
                { name: "Stow", ratio: 1.0, msg: "Stow reached! Preparing return run..." }
            ],
            speed: 0.8,
            direction: 1
        },
        {
            id: 'RI',
            pathId: 'routeRI',
            truckId: 'truckRI',
            bubbleTextId: 'bubbleTextRI',
            cities: [
                { name: "Woonsocket", ratio: 0.0, msg: "Departing Woonsocket!" },
                { name: "Providence", ratio: 0.5, msg: "Loading waste in Providence!" },
                { name: "Newport", ratio: 1.0, msg: "Final collection in Newport!" }
            ],
            speed: 0.65,
            direction: 1
        }
    ];

    // Setup routes variables
    routes.forEach(route => {
        route.path = document.getElementById(route.pathId);
        route.truck = document.getElementById(route.truckId);
        route.bubbleText = document.getElementById(route.bubbleTextId);
        if (route.path) {
            route.length = route.path.getTotalLength();
        }
        route.distance = 0;
        route.paused = false;
        route.pauseTimer = 0;
        route.lastCityIdx = -1;
    });

    function animateTrucks() {
        routes.forEach(route => {
            if (!route.path || !route.truck || !route.bubbleText) return;

            if (route.paused) {
                route.pauseTimer += 16.67; // Approx 1 frame at 60fps
                if (route.pauseTimer >= 3000) { // 3 seconds stop
                    route.paused = false;
                    route.pauseTimer = 0;
                    route.bubbleText.textContent = "On my way!!!!!!";
                }
                return;
            }

            // Move
            route.distance += route.speed * route.direction;

            // Loop bounds
            if (route.distance >= route.length) {
                route.distance = route.length;
                route.direction = -1; // Reverse direction
                route.paused = true;
                route.lastCityIdx = route.cities.length - 1;
                route.bubbleText.textContent = route.cities[route.lastCityIdx].msg;
                return;
            } else if (route.distance <= 0) {
                route.distance = 0;
                route.direction = 1; // Forward direction
                route.paused = true;
                route.lastCityIdx = 0;
                route.bubbleText.textContent = route.cities[0].msg;
                return;
            }

            // Check if near any city (excluding endpoints which are handled by bounds)
            const currentRatio = route.distance / route.length;
            route.cities.forEach((city, idx) => {
                if (idx > 0 && idx < route.cities.length - 1) {
                    if (Math.abs(currentRatio - city.ratio) < 0.015 && route.lastCityIdx !== idx) {
                        route.paused = true;
                        route.lastCityIdx = idx;
                        route.bubbleText.textContent = city.msg;
                    }
                }
            });

            // Reset city lock once we move away
            if (route.lastCityIdx !== -1) {
                const lastCity = route.cities[route.lastCityIdx];
                if (Math.abs(currentRatio - lastCity.ratio) > 0.05) {
                    route.lastCityIdx = -1;
                }
            }

            // Calculate position & rotation
            const p1 = route.path.getPointAtLength(route.distance);
            const nextDist = Math.max(0, Math.min(route.length, route.distance + 2 * route.direction));
            const p2 = route.path.getPointAtLength(nextDist);
            
            let angle = 0;
            if (p2) {
                angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            }

            // Apply SVG transforms
            route.truck.setAttribute('transform', `translate(${p1.x}, ${p1.y}) rotate(${angle})`);
            
            // Counter rotate bubble to keep it perfectly horizontal
            const bubble = route.truck.querySelector('.svg-bubble');
            if (bubble) {
                bubble.setAttribute('transform', `translate(0, -32) rotate(${-angle})`);
            }
        });

        requestAnimationFrame(animateTrucks);
    }

    // Start animating if paths are loaded
    setTimeout(() => {
        requestAnimationFrame(animateTrucks);
    }, 1000);

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
