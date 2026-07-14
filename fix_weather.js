const fs = require('fs');
let html = fs.readFileSync('weather.html', 'utf8');

// Remove Rhode Island button
html = html.replace('<button class="state-btn btn-ri" data-state="RI">Rhode Island</button>', '');

// Remove Providence node
let provRegex = /<g class="map-region" data-town="Providence, RI"[\s\S]*?<\/g>/;
html = html.replace(provRegex, '');

// Remove Newport node
let newpRegex = /<g class="map-region" data-town="Newport, RI"[\s\S]*?<\/g>/;
html = html.replace(newpRegex, '');

// Clean text references
html = html.replace(/ and Rhode Island/g, '');
html = html.replace(/ & Rhode Island/g, '');
html = html.replace(/Massachusetts and Rhode Island/g, 'Massachusetts');

fs.writeFileSync('weather.html', html);

let js = fs.readFileSync('assets/js/weather.js', 'utf8');
let jsRegex = /,\s*'RI':\s*\{\s*name:\s*'Rhode Island',\s*defaultQuery:\s*'Rhode Island',\s*cities:\s*\[[^\]]+\]\s*\}/;
js = js.replace(jsRegex, '');
js = js.replace(/Rhode Island/g, 'Massachusetts');
js = js.replace(/RI/g, 'MA');
fs.writeFileSync('assets/js/weather.js', js);
console.log('Fixed weather files.');
