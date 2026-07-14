document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'd36bc7159cfd42e6b14163038260807';
    
    // State definitions
    const STATES = {
        'MA': {
            name: 'Massachusetts',
            defaultQuery: 'Massachusetts',
            cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Framingham', 'Natick', 'Wellesley', 'Weston', 'Wayland', 'Sudbury', 'Marlborough', 'Southborough', 'Westborough', 'Ashland', 'Hopkinton']
        }
    };
    
    let currentState = 'MA';

    // Cache for map hover and dropdown data
    const weatherCache = {};

    // DOM Elements
    const alertBanner = document.getElementById('weather-alert-banner');
    const alertCloseBtn = document.getElementById('alert-close-btn');
    const alertTitle = document.getElementById('alert-title');
    const alertDesc = document.getElementById('alert-desc');
    
    // Location Selectors
    const stateBtns = document.querySelectorAll('.state-btn');
    const citySelect = document.getElementById('city-select');
    
    // Hero Elements
    const locEl = document.getElementById('weather-location');
    const timeEl = document.getElementById('weather-time');
    const iconContainer = document.getElementById('current-icon-container');
    const tempEl = document.getElementById('current-temp');
    const condEl = document.getElementById('current-condition');
    
    // Details Elements
    const windEl = document.getElementById('detail-wind');
    const humidityEl = document.getElementById('detail-humidity');
    const uvEl = document.getElementById('detail-uv');
    const pressureEl = document.getElementById('detail-pressure');
    
    // Map Elements
    const mapRegions = document.querySelectorAll('.map-region');
    const tooltip = document.getElementById('map-tooltip');
    
    init();

    function init() {
        // Handle scroll animations
        setupScrollAnimations();
        
        // Handle alert close
        if (alertCloseBtn) {
            alertCloseBtn.addEventListener('click', () => {
                alertBanner.classList.remove('active');
            });
        }
        
        // Setup Map Hover
        setupMapInteractions();

        // Setup Selectors
        setupSelectors();

        // Auto-detect location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Update dropdown to show auto location
                    const autoOption = document.createElement('option');
                    autoOption.value = `${lat},${lon}`;
                    autoOption.textContent = '📍 Your Location';
                    citySelect.insertBefore(autoOption, citySelect.firstChild);
                    citySelect.value = `${lat},${lon}`;

                    loadLocationWeather(`${lat},${lon}`);
                },
                (error) => {
                    console.log("Geolocation denied or failed.", error);
                    loadLocationWeather('Massachusetts');
                }
            );
        } else {
            loadLocationWeather('Massachusetts');
        }
    }

    function setupSelectors() {
        // State buttons
        stateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stateCode = btn.getAttribute('data-state');
                if (currentState !== stateCode) {
                    currentState = stateCode;
                    
                    // Update active styling
                    stateBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Populate cities
                    populateCities(stateCode);
                    
                    // Load generic state weather
                    loadLocationWeather(STATES[stateCode].defaultQuery);
                }
            });
        });
        
        // City dropdown
        citySelect.addEventListener('change', () => {
            const val = citySelect.value;
            if (val === 'default') {
                loadLocationWeather(STATES[currentState].defaultQuery);
            } else {
                loadLocationWeather(val);
            }
        });
        
        // Initial populate
        populateCities(currentState);
    }

    function populateCities(stateCode) {
        citySelect.innerHTML = `<option value="default">Overall ${STATES[stateCode].name} Weather</option>`;
        STATES[stateCode].cities.forEach(city => {
            const opt = document.createElement('option');
            opt.value = city;
            opt.textContent = city;
            citySelect.appendChild(opt);
        });
    }

    async function loadLocationWeather(query) {
        // Reset to skeleton loading
        setSkeleton(true);
        
        let data = weatherCache[query];
        if (!data) {
            data = await fetchWeatherData(query);
            if (data) {
                weatherCache[query] = data;
            }
        }
        
        if (data) {
            setSkeleton(false);
            updateDashboard(data);
            checkAlerts(data);
        }
    }

    function setSkeleton(isLoading) {
        if (isLoading) {
            locEl.classList.add('skeleton-text');
            timeEl.classList.add('skeleton-text');
            iconContainer.classList.add('skeleton-box');
            windEl.classList.add('skeleton-text');
            humidityEl.classList.add('skeleton-text');
            uvEl.classList.add('skeleton-text');
            pressureEl.classList.add('skeleton-text');
            
            iconContainer.innerHTML = '';
            tempEl.innerHTML = '--';
        } else {
            locEl.classList.remove('skeleton-text');
            timeEl.classList.remove('skeleton-text');
            iconContainer.classList.remove('skeleton-box');
            windEl.classList.remove('skeleton-text');
            humidityEl.classList.remove('skeleton-text');
            uvEl.classList.remove('skeleton-text');
            pressureEl.classList.remove('skeleton-text');
        }
    }

    async function fetchWeatherData(query) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=1&alerts=yes`);
            if (!response.ok) throw new Error('Weather data fetch failed');
            return await response.json();
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    }

    function updateDashboard(data) {
        // Update Text
        locEl.textContent = `${data.location.name}, ${data.location.region}`;
        
        const date = new Date(data.location.localtime);
        timeEl.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - Live Update';
        
        condEl.textContent = data.current.condition.text;
        
        windEl.textContent = `${data.current.wind_mph} mph`;
        humidityEl.textContent = `${data.current.humidity}%`;
        uvEl.textContent = data.current.uv;
        pressureEl.textContent = `${data.current.pressure_in} in`;

        // Update Emoji
        iconContainer.innerHTML = getEmojiForCondition(data.current.condition.code, data.current.is_day);

        // Animate Temperature Number
        animateValue(tempEl, 0, Math.round(data.current.temp_f), 1000);
    }

    function getEmojiForCondition(code, isDay) {
        if ([1000].includes(code)) return isDay ? '☀️' : '🌙'; // Clear
        if ([1003, 1006].includes(code)) return isDay ? '⛅' : '☁️'; // Partly cloudy / cloudy
        if ([1009].includes(code)) return '☁️'; // Overcast
        if ([1030, 1135, 1148].includes(code)) return '🌫️'; // Fog
        if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) return '🌧️'; // Rain
        if ([1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(code)) return '❄️'; // Snow
        if ([1087, 1273, 1276, 1279, 1282].includes(code)) return '⛈️'; // Storm
        return '☁️';
    }

    function checkAlerts(data) {
        if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
            const alert = data.alerts.alert[0];
            
            // Interactive Emojis based on alert type
            let emoji = '🚨';
            const eventLower = alert.event.toLowerCase();
            if (eventLower.includes('rip current')) emoji = '🌊';
            else if (eventLower.includes('wind')) emoji = '💨';
            else if (eventLower.includes('flood')) emoji = '💧';
            else if (eventLower.includes('thunder') || eventLower.includes('tornado')) emoji = '⛈️';
            else if (eventLower.includes('winter') || eventLower.includes('snow')) emoji = '❄️';
            else if (eventLower.includes('heat')) emoji = '🔥';
            
            alertTitle.textContent = `${emoji} ${alert.event}`;
            
            // Make the statement smaller by stripping repetitive NWS boilerplate
            let cleanHeadline = alert.headline || 'Please check local forecasts for details.';
            cleanHeadline = cleanHeadline.replace(/issued.*?by NWS.*/i, '').trim();
            alertDesc.textContent = cleanHeadline;
            
            alertBanner.classList.add('active');
        } else {
            alertBanner.classList.remove('active');
        }
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Map Interactions
    function setupMapInteractions() {
        const mapContainer = document.getElementById('interactive-map');
        
        mapRegions.forEach(region => {
            region.addEventListener('mouseenter', async (e) => {
                const town = region.getAttribute('data-town');
                const query = region.getAttribute('data-q');
                
                tooltip.classList.remove('hidden');
                document.getElementById('tooltip-town').textContent = town;
                
                if (weatherCache[query]) {
                    updateTooltip(weatherCache[query]);
                } else {
                    document.getElementById('tooltip-temp').textContent = '...';
                    document.getElementById('tooltip-cond').textContent = 'Loading';
                    
                    const data = await fetchWeatherData(query);
                    if (data) {
                        weatherCache[query] = data;
                        if (tooltip.getAttribute('data-current') === query) {
                            updateTooltip(data);
                        }
                    }
                }
                tooltip.setAttribute('data-current', query);
            });
            
            region.addEventListener('mousemove', (e) => {
                const rect = mapContainer.getBoundingClientRect();
                const x = e.clientX - rect.left + 15;
                const y = e.clientY - rect.top + 15;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });
            
            region.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
                tooltip.removeAttribute('data-current');
            });
        });
    }

    function updateTooltip(data) {
        document.getElementById('tooltip-temp').innerHTML = `${Math.round(data.current.temp_f)}&deg;F`;
        document.getElementById('tooltip-cond').textContent = data.current.condition.text;
        
        const statusEl = document.getElementById('tooltip-status');
        const statusText = statusEl.querySelector('.status-text');
        const statusInd = statusEl.querySelector('.status-indicator');
        
        const code = data.current.condition.code;
        if ([1117, 1225, 1279, 1282].includes(code)) {
            statusText.textContent = 'Delayed';
            statusInd.style.background = '#facc15'; // yellow
        } else {
            statusText.textContent = 'On Schedule';
            statusInd.style.background = '#4ade80'; // green
        }
    }

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-slide-up').forEach(el => {
            observer.observe(el);
        });
    }
});
