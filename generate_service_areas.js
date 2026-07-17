const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'C:\\\\Users\\\\herma\\\\Downloads\\\\Nouveau dossier (10)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

const townCounts = {};

files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const matches = [...content.matchAll(/  ([A-Za-z ]+) MA \d{5}/g)];
    matches.forEach(m => {
        let t = m[1].trim().toLowerCase();
        // Capitalize first letter of each word
        t = t.replace(/\b\w/g, l => l.toUpperCase());
        t = t + ', MA';
        townCounts[t] = (townCounts[t] || 0) + 1;
    });
});

console.log('Towns found:', townCounts);

const options = {
    headers: { 'User-Agent': 'WasteUniverse-TownTracker/1.0' }
};

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const results = [];
    for (const town of Object.keys(townCounts)) {
        console.log(`Geocoding ${town}...`);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(town)}`;
        const coords = await fetchJson(url);
        if (coords && coords.length > 0) {
            results.push({
                name: town,
                activeStops: townCounts[town],
                lat: parseFloat(coords[0].lat),
                lon: parseFloat(coords[0].lon)
            });
        }
        await delay(1100);
    }
    
    results.sort((a,b) => b.activeStops - a.activeStops);
    fs.writeFileSync(path.join(__dirname, 'assets', 'js', 'service_areas.json'), JSON.stringify(results, null, 2));
    console.log('Done!');
}

run();
