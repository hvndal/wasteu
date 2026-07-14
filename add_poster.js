const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The line is: <video autoplay loop muted playsinline class="hero-bg">
// We want: <video autoplay loop muted playsinline class="hero-bg" poster="assets/images/hero-fallback.jpg">

html = html.replace(
    /<video autoplay loop muted playsinline class="hero-bg">/g, 
    '<video autoplay loop muted playsinline poster="assets/images/hero-fallback.jpg" class="hero-bg">'
);

fs.writeFileSync('index.html', html);
console.log('Added poster attribute');
