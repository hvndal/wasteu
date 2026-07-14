const fs = require('fs');

if (fs.existsSync('sitemap.xml')) {
    let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

    const newUrls = [
        'dumpster-rental-littleton-ma.html',
        'dumpster-rental-littleton-common-ma.html',
        'dumpster-rental-stow-ma.html',
        'dumpster-rental-acton-ma.html',
        'dumpster-rental-harvard-ma.html',
        'dumpster-rental-maynard-ma.html',
        'dumpster-rental-concord-ma.html'
    ];

    let urlsToAppend = '';
    const date = new Date().toISOString().split('T')[0];

    for (let url of newUrls) {
        if (!sitemap.includes(url)) {
            urlsToAppend += `
    <url>
        <loc>https://wasteuniverse.com/${url}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        }
    }

    if (urlsToAppend !== '') {
        sitemap = sitemap.replace('</urlset>', urlsToAppend + '\n</urlset>');
        fs.writeFileSync('sitemap.xml', sitemap);
        console.log('Updated sitemap.xml');
    } else {
        console.log('URLs already in sitemap');
    }
} else {
    // create new sitemap if it doesn't exist
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://wasteuniverse.com/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://wasteuniverse.com/dumpster-rentals.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://wasteuniverse.com/services.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://wasteuniverse.com/about.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    
    const newUrls = [
        'dumpster-rental-littleton-ma.html',
        'dumpster-rental-littleton-common-ma.html',
        'dumpster-rental-stow-ma.html',
        'dumpster-rental-acton-ma.html',
        'dumpster-rental-harvard-ma.html',
        'dumpster-rental-maynard-ma.html',
        'dumpster-rental-concord-ma.html'
    ];
    
    for (let url of newUrls) {
        sitemap += `
    <url>
        <loc>https://wasteuniverse.com/${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
    }
    
    sitemap += '\n</urlset>';
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Created and populated sitemap.xml');
}
