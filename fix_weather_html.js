const fs = require('fs');
let html = fs.readFileSync('weather.html', 'utf8');

html = html.replace('<select id="city-select" class="neo-select">', '<div style="display: flex; gap: 10px; align-items: center;"><select id="city-select" class="neo-select" style="flex-grow: 1;">');
html = html.replace('<!-- Cities populated by JS -->\r\n                    </select>', '<!-- Cities populated by JS -->\r\n                    </select>\n                    <button id="auto-detect-btn" class="btn btn-gold" style="white-space: nowrap; padding: 0.5rem 1rem; border: 2px solid var(--primary-black); font-weight: bold;">📍 Auto-Detect</button>\n                    </div>');

fs.writeFileSync('weather.html', html);
console.log('Fixed weather.html button');
