const fs = require('fs');
let html = fs.readFileSync('weather.html', 'utf8');

// The banner block
const bannerStart = '    <!-- Alert Banner (Hidden by default) -->';
const bannerEnd = '    </div>\r\n\r\n    <!-- Navbar -->';

const startIndex = html.indexOf(bannerStart);
const endIndex = html.indexOf(bannerEnd) + '    </div>\r\n'.length;

const bannerCode = html.substring(startIndex, endIndex);

// Remove the banner from its current position
html = html.substring(0, startIndex) + html.substring(endIndex);

// Find the end of the navbar
const navEnd = '    </nav>\r\n';
const navEndIndex = html.indexOf(navEnd) + navEnd.length;

// Insert the banner right after the navbar
html = html.substring(0, navEndIndex) + '\r\n' + bannerCode + html.substring(navEndIndex);

fs.writeFileSync('weather.html', html);
console.log('Moved weather alert banner below navbar');
