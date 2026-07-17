
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the badge I added
html = html.replace(/<span style="display: inline-block; background: var\(--forest-green\);[^>]+>Businesses Choose Waste Universe<\/span>\n\s*<h3>Commercial Pickup<\/h3>/, '<h3>Commercial Pickup</h3>');

// 2. Change the src back to commercial_edited.jpg
html = html.replace(/<img src="assets\/images\/commercial_new\.jpg" alt="Commercial Pickup" loading="lazy">/, '<img src="assets/images/commercial_edited.jpg" alt="Commercial Pickup" loading="lazy">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML updated successfully to use edited photo');

