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

    // Animated NES Retro Truck with Stops & Speech Bubbles
    const route = {
        path: document.getElementById('routeMain'),
        truck: document.getElementById('truckMainGroup'),
        bubbleText: document.getElementById('driver-bubble-text'),
        cities: [
            { name: "Framingham", ratio: 0.0, msg: "Departing Framingham Hub!" },
            { name: "Maynard", ratio: 0.25, msg: "Emptying recycling bins in Maynard!" },
            { name: "Stow", ratio: 0.5, msg: "Picking up trash in Stow!" },
            { name: "Providence", ratio: 0.75, msg: "Loading waste in Providence!" },
            { name: "Newport", ratio: 1.0, msg: "Final collection in Newport!" }
        ],
        maxSpeed: 0.75,
        currentSpeed: 0.75,
        direction: 1,
        distance: 0,
        state: 'driving', // 'driving', 'slowing', 'paused', 'accelerating'
        targetCityIdx: -1,
        pauseTimer: 0,
        lastCityIdx: -1
    };

    if (route.path) {
        route.length = route.path.getTotalLength();
    }

    function animateTruck() {
        if (!route.path || !route.truck || !route.bubbleText) return;

        const currentRatio = route.distance / route.length;

        if (route.state === 'paused') {
            route.pauseTimer += 16.67;
            if (route.pauseTimer >= 3000) { // 3 seconds stop
                route.state = 'accelerating';
                route.pauseTimer = 0;
                route.bubbleText.textContent = "On my way!!!!!!";
            }
        } else if (route.state === 'driving') {
            // Check if approaching a city
            route.cities.forEach((city, idx) => {
                const distToCity = city.ratio * route.length - route.distance;
                const approachDist = 30; // Begin slowing down 30px away
                
                if (route.direction * distToCity > 0 && Math.abs(distToCity) < approachDist) {
                    if (route.lastCityIdx !== idx) {
                        route.state = 'slowing';
                        route.targetCityIdx = idx;
                    }
                }
            });
            
            // Move normal speed
            route.distance += route.maxSpeed * route.direction;
        } else if (route.state === 'slowing') {
            const targetDist = route.cities[route.targetCityIdx].ratio * route.length;
            const distToCity = targetDist - route.distance;
            
            // Proportional deceleration down to a minimum crawl
            const factor = Math.max(0.1, Math.min(1, Math.abs(distToCity) / 30));
            route.currentSpeed = route.maxSpeed * factor;
            route.distance += route.currentSpeed * route.direction;

            // Arrived at stop
            if (Math.abs(distToCity) < 0.6) {
                route.distance = targetDist;
                route.state = 'paused';
                route.currentSpeed = 0;
                route.lastCityIdx = route.targetCityIdx;
                route.bubbleText.textContent = route.cities[route.targetCityIdx].msg;
            }
        } else if (route.state === 'accelerating') {
            // Eased acceleration back to normal speed
            route.currentSpeed += 0.02;
            if (route.currentSpeed >= route.maxSpeed) {
                route.currentSpeed = route.maxSpeed;
                route.state = 'driving';
            }
            route.distance += route.currentSpeed * route.direction;
        }

        // Wrap-around bounds handling
        if (route.distance >= route.length) {
            route.distance = route.length;
            route.direction = -1;
            route.state = 'slowing';
            route.targetCityIdx = route.cities.length - 1;
        } else if (route.distance <= 0) {
            route.distance = 0;
            route.direction = 1;
            route.state = 'slowing';
            route.targetCityIdx = 0;
        }

        // Position & rotate smoothly
        const p1 = route.path.getPointAtLength(route.distance);
        const lookAhead = 2 * route.direction;
        const nextDist = Math.max(0, Math.min(route.length, route.distance + lookAhead));
        const p2 = route.path.getPointAtLength(nextDist);
        
        let angle = 0;
        if (p2 && p1 && (p2.x !== p1.x || p2.y !== p1.y)) {
            angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        }

        route.truck.setAttribute('transform', `translate(${p1.x}, ${p1.y}) rotate(${angle})`);
        
        const bubble = route.truck.querySelector('.svg-bubble');
        if (bubble) {
            bubble.setAttribute('transform', `translate(0, -32) rotate(${-angle})`);
        }

        requestAnimationFrame(animateTruck);
    }

    setTimeout(() => {
        requestAnimationFrame(animateTruck);
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
