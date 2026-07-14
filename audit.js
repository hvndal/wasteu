const fs = require('fs');

const files = ['index.html', 'services.html', 'blog.html', 'weather.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    const html = fs.readFileSync(f, 'utf8');
    console.log(`\n--- Auditing ${f} ---`);
    
    // Check Viewport
    if (!html.match(/<meta\s+name="viewport"/i)) {
        console.log('❌ Missing viewport meta tag');
    } else {
        console.log('✅ Viewport meta tag present');
    }

    // Check H1 Count
    const h1Matches = html.match(/<h1.*?>/gi) || [];
    if (h1Matches.length !== 1) {
        console.log(`❌ H1 count is ${h1Matches.length} (Expected exactly 1)`);
    } else {
        console.log('✅ Exactly one H1 present');
    }

    // Check Images for Alt Text
    const imgMatches = html.match(/<img[^>]+>/gi) || [];
    let missingAlt = 0;
    imgMatches.forEach(img => {
        if (!img.match(/alt=/i)) {
            missingAlt++;
        }
    });
    if (missingAlt > 0) {
        console.log(`❌ ${missingAlt} image(s) missing alt text`);
    } else {
        console.log('✅ All images have alt attributes');
    }
});
