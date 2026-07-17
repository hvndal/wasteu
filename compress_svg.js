
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add preserveAspectRatio slice to crop the height
html = html.replace(/<svg class="route-map-svg" viewBox="0 0 680 220" xmlns="http:\/\/www\.w3\.org\/2000\/svg">/,
                    '<svg class="route-map-svg" viewBox="0 20 680 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML SVG compressed successfully');

