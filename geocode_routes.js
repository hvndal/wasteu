const fs = require('fs');
const path = require('path');
const https = require('https');

const CSV_DIR = 'C:\\Users\\herma\\Downloads\\Nouveau dossier (10)';
const CACHE_FILE = path.join(__dirname, 'geocode_cache.json');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'js', 'routes.json');

// Nominatim requires a User-Agent
const options = {
    headers: { 'User-Agent': 'WasteUniverse-RouteTracker/1.0' }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try { resolve(JSON.parse(data)); }
                    catch (e) { resolve(null); }
                });
            } else {
                resolve(null);
            }
        }).on('error', () => resolve(null));
    });
}

async function run() {
    let cache = {};
    if (fs.existsSync(CACHE_FILE)) {
        cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }

    const files = fs.readdirSync(CSV_DIR).filter(f => f.endsWith('.csv'));
    const uniqueAddresses = new Set();
    const routeData = [];

    // 1. Gather all addresses
    for (const file of files) {
        const text = fs.readFileSync(path.join(CSV_DIR, file), 'utf8');
        const lines = text.split('\n');
        
        // Skip header
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',');
            if (cols.length > 2 && cols[2]) {
                const addr = cols[2].trim();
                if (addr && addr.length > 5) {
                    uniqueAddresses.add(addr);
                    routeData.push({
                        routeName: cols[9] ? cols[9].replace(/"/g, '').trim() : 'Unknown',
                        address: addr
                    });
                }
            }
        }
    }

    const addresses = Array.from(uniqueAddresses).slice(0, 150);
    console.log(`Found ${uniqueAddresses.size} unique addresses, processing sample of ${addresses.length}.`);
    
    let newGeocodes = 0;
    
    // 2. Geocode missing addresses
    for (let i = 0; i < addresses.length; i++) {
        const addr = addresses[i];
        if (!cache[addr]) {
            console.log(`[${i+1}/${addresses.length}] Geocoding: ${addr}`);
            // Format address for nominatim (it often struggles with double spaces, so clean it)
            const cleanAddr = addr.replace(/\s+/g, ' ');
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanAddr)}`;
            
            const results = await fetchJson(url);
            if (results && results.length > 0) {
                cache[addr] = {
                    lat: parseFloat(results[0].lat),
                    lon: parseFloat(results[0].lon)
                };
            } else {
                cache[addr] = { failed: true }; // Don't retry failures forever
            }
            newGeocodes++;
            // Save cache periodically
            if (newGeocodes % 10 === 0) {
                fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
            }
            await delay(1100); // 1.1s delay to respect Nominatim policy
        }
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

    // 3. Build anonymized output points (round to 2 decimal places ~1.1km grid)
    const anonymizedSet = new Set();
    const points = [];
    for (const stop of routeData) {
        const geo = cache[stop.address];
        if (geo && !geo.failed) {
            // Rounding to 2 decimal places ensures exact stops are NEVER exposed (even in network traffic)
            const approxLat = parseFloat(geo.lat.toFixed(2));
            const approxLon = parseFloat(geo.lon.toFixed(2));
            const key = `${approxLat},${approxLon}`;
            
            if (!anonymizedSet.has(key)) {
                anonymizedSet.add(key);
                points.push({ lat: approxLat, lon: approxLon });
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(points, null, 2));
    console.log(`\nSuccessfully exported ${points.length} coordinates to routes.json!`);
}

run().catch(console.error);
