const fs = require('fs');

const addressHTML = `
                    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light); text-align: center;">
                        <strong>Waste Universe LLC</strong><br>
                        34 Powder Mill Rd<br>
                        Maynard, MA 01754
                    </p>`;

// Fix blog.html
let blogHTML = fs.readFileSync('blog.html', 'utf8');
if (!blogHTML.includes('Waste Universe LLC')) {
    blogHTML = blogHTML.replace(/(<p>&copy; 2026 Waste Universe. All Rights Reserved.<\/p>)/, '$1' + addressHTML);
    fs.writeFileSync('blog.html', blogHTML);
    console.log('Fixed blog.html');
}

// Fix weather.html
let weatherHTML = fs.readFileSync('weather.html', 'utf8');
if (!weatherHTML.includes('Waste Universe LLC')) {
    const weatherAddressHTML = `
                    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light);">
                        <strong>Waste Universe LLC</strong><br>
                        34 Powder Mill Rd<br>
                        Maynard, MA 01754
                    </p>`;
    weatherHTML = weatherHTML.replace(/(<div class="footer-about">[\s\S]*?<\/p>)/, '$1' + weatherAddressHTML);
    fs.writeFileSync('weather.html', weatherHTML);
    console.log('Fixed weather.html');
}
