const fs = require('fs');
let js = fs.readFileSync('assets/js/weather.js', 'utf8');

js = js.replace("const stateBtns = document.querySelectorAll('.state-btn');", "const stateBtns = document.querySelectorAll('.state-btn');\n    const autoDetectBtn = document.getElementById('auto-detect-btn');");

let replacement = `function setupSelectors() {
        if (autoDetectBtn) {
            autoDetectBtn.addEventListener('click', () => {
                if ("geolocation" in navigator) {
                    autoDetectBtn.textContent = "Locating...";
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            const autoOption = document.createElement('option');
                            autoOption.value = \`\${lat},\${lon}\`;
                            autoOption.textContent = '📍 Auto-Detected Location';
                            citySelect.insertBefore(autoOption, citySelect.firstChild);
                            citySelect.value = \`\${lat},\${lon}\`;
                            loadLocationWeather(\`\${lat},\${lon}\`);
                            autoDetectBtn.textContent = "📍 Auto-Detect";
                        },
                        (error) => {
                            console.log("Geolocation denied or failed.", error);
                            alert("Could not detect your location. Please check your browser permissions.");
                            autoDetectBtn.textContent = "📍 Auto-Detect";
                        }
                    );
                } else {
                    alert("Geolocation is not supported by your browser.");
                }
            });
        }`;

js = js.replace("function setupSelectors() {", replacement);

fs.writeFileSync('assets/js/weather.js', js);
console.log('Fixed weather.js auto-detect logic');
