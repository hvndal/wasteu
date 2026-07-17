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
    const TOWN_COORDS = {};
    const weatherCache = {};

    // DOM Elements
    const alertBanner = document.getElementById('weather-alert-banner');
    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            alertBanner.classList.remove('active');
        });
    }

    const citySelect = document.getElementById('city-select');
    const stateBtns = document.querySelectorAll('.state-btn');
    const autoDetectBtn = document.getElementById('btn-auto-detect');
    
    const locEl = document.getElementById('weather-location');
    const timeEl = document.getElementById('weather-time');
    const iconContainer = document.getElementById('current-icon-container');
    const tempEl = document.getElementById('current-temp');
    const condEl = document.getElementById('current-condition');
    
    const windEl = document.getElementById('detail-wind');
    const humidityEl = document.getElementById('detail-humidity');
    const uvEl = document.getElementById('detail-uv');
    const pressureEl = document.getElementById('detail-pressure');

    let GLOBAL_MAP = null;

    function setupSelectors() {
        if (autoDetectBtn) {
            autoDetectBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    autoDetectBtn.textContent = "Detecting...";
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const query = `${lat},${lon}`;
                            
                            // Load weather for coordinates
                            await loadLocationWeather(query);
                            autoDetectBtn.textContent = "📍 Auto-Detect";
                            
                            // Fly to location
                            if (GLOBAL_MAP) {
                                GLOBAL_MAP.flyTo({ center: [lon, lat], zoom: 12, speed: 1.5 });
                            }
                            
                            // Extract city from cache and update dropdown
                            const data = weatherCache[query];
                            if (data && data.location && data.location.name) {
                                const cityName = data.location.name;
                                if (!STATES['MA'].cities.includes(cityName)) {
                                    STATES['MA'].cities.push(cityName);
                                    STATES['MA'].cities.sort();
                                    TOWN_COORDS[`${cityName}, MA`] = [lat, lon];
                                }
                                populateCities(currentState);
                                citySelect.value = cityName;
                            }
                        },
                        (error) => {
                            console.error("Geolocation error:", error);
                            autoDetectBtn.textContent = "📍 Auto-Detect";
                        }
                    );
                }
            });
        }
        
        stateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const stateCode = btn.getAttribute('data-state');
                if (currentState !== stateCode) {
                    currentState = stateCode;
                    stateBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    populateCities(stateCode);
                    loadLocationWeather(STATES[stateCode].defaultQuery);
                }
            });
        });
        
        citySelect.addEventListener('change', () => {
            const val = citySelect.value;
            if (val === 'default') {
                loadLocationWeather(STATES[currentState].defaultQuery);
                if (GLOBAL_MAP) GLOBAL_MAP.flyTo({ center: [-71.5, 42.3], zoom: 7.5 });
            } else {
                loadLocationWeather(val);
                const coords = TOWN_COORDS[`${val}, MA`];
                if (coords && GLOBAL_MAP) {
                    GLOBAL_MAP.flyTo({ center: [coords[1], coords[0]], zoom: 11 });
                }
            }
        });
        
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
        setSkeleton(true);
        let data = weatherCache[query];
        if (!data) {
            data = await fetchWeatherData(query);
            if (data) weatherCache[query] = data;
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
            tempEl.innerHTML = '--';
        } else {
            locEl.classList.remove('skeleton-text');
            timeEl.classList.remove('skeleton-text');
            iconContainer.classList.remove('skeleton-box');
        }
    }

    async function fetchWeatherData(query) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=1&alerts=yes`);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            return null;
        }
    }

    function updateServiceStatus(data) {
        const widget = document.getElementById('service-status-widget');
        const icon = document.getElementById('status-icon');
        const title = document.getElementById('status-title');
        const reason = document.getElementById('status-reason');
        
        if (!widget || !icon || !title || !reason) return;
        
        const condition = data.current.condition.text.toLowerCase();
        const temp = data.current.temp_f;
        
        const severeConditions = ['snow', 'blizzard', 'ice', 'freezing', 'pellets'];
        let isDelayed = false;
        let delayReason = '';
        
        if (severeConditions.some(c => condition.includes(c))) {
            isDelayed = true;
            delayReason = `Service may be delayed due to ${data.current.condition.text}.`;
        } else if (temp < 15) {
            isDelayed = true;
            delayReason = 'Service may be delayed due to extreme cold hazards.';
        }
        
        if (isDelayed) {
            widget.className = 'service-status-container status-delayed';
            icon.innerText = '⚠️';
            title.innerText = 'Possible Delay';
            reason.innerText = delayReason;
        } else {
            widget.className = 'service-status-container status-on-schedule';
            icon.innerText = '✅';
            title.innerText = 'On Schedule';
            reason.innerText = 'Weather conditions are clear. Service will proceed as planned.';
        }
    }

    function updateDashboard(data) {
        updateServiceStatus(data);
        locEl.textContent = `${data.location.name}, ${data.location.region}`;
        condEl.textContent = data.current.condition.text;
        windEl.textContent = `${data.current.wind_mph} mph`;
        humidityEl.textContent = `${data.current.humidity}%`;
        uvEl.textContent = data.current.uv;
        pressureEl.textContent = `${data.current.pressure_in} in`;
        iconContainer.innerHTML = getEmojiForCondition(data.current.condition.code, data.current.is_day);
        animateValue(tempEl, 0, Math.round(data.current.temp_f), 1000);
    }

    function getEmojiForCondition(code, isDay) {
        if ([1000].includes(code)) return isDay ? '☀️' : '🌙';
        if ([1003, 1006, 1009].includes(code)) return '☁️';
        if ([1063, 1180, 1183, 1189, 1195, 1240].includes(code)) return '🌧️';
        if ([1066, 1114, 1213, 1219, 1225].includes(code)) return '❄️';
        if ([1087, 1273, 1276].includes(code)) return '⛈️';
        return '☁️';
    }

    function checkAlerts(data) {
        if (data.alerts && data.alerts.alert && data.alerts.alert.length > 0) {
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
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    async function initMapLibre() {
        if (!window.maplibregl) return;
        
        GLOBAL_MAP = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-71.5, 42.3],
            zoom: 7.5,
            attributionControl: false,
            pitchWithRotate: false,
            dragRotate: false
        });

        GLOBAL_MAP.on('load', async () => {
            try {
                const res = await fetch('assets/data/routes.json');
                const routeData = await res.json();
                
                // Add routes data source
                GLOBAL_MAP.addSource('routes', {
                    type: 'geojson',
                    data: routeData
                });
                
                // Premium Glow Visualization
                GLOBAL_MAP.addLayer({
                    id: 'route-glow',
                    type: 'circle',
                    source: 'routes',
                    paint: {
                        'circle-radius': 12,
                        'circle-color': '#ff3b30',
                        'circle-opacity': 0.3,
                        'circle-blur': 0.5
                    }
                });
                GLOBAL_MAP.addLayer({
                    id: 'route-core',
                    type: 'circle',
                    source: 'routes',
                    paint: {
                        'circle-radius': 4,
                        'circle-color': '#ff3b30',
                        'circle-opacity': 0.9
                    }
                });
            } catch (e) {
                console.error("Map route load error:", e);
            }
        });
    }

    async function init() {
        setupSelectors();
        await loadLocationWeather(STATES[currentState].defaultQuery);
        if (navigator.geolocation) {
            // Auto trigger geolocation prompt once on load
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const q = `${pos.coords.latitude},${pos.coords.longitude}`;
                    await loadLocationWeather(q);
                    if (GLOBAL_MAP) GLOBAL_MAP.flyTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 12 });
                },
                (err) => console.log('Location denied on load', err)
            );
        }
        initMapLibre();
    }
    
    init();
});
