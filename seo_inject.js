const fs = require('fs');

const targetDesc = "Family-owned waste management serving Maynard, Littleton (including Littleton Common), Stow, Acton, Harvard, Concord, and surrounding MA communities.";

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Update Meta Description
indexHtml = indexHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    `<meta name="description" content="${targetDesc}">`
);

// Add AreaServed to JSON-LD
const areaServedJson = `
      "areaServed": [
        "Maynard, MA",
        "Littleton, MA",
        "Littleton Common, MA",
        "Stow, MA",
        "Acton, MA",
        "Harvard, MA",
        "Concord, MA"
      ],`;
// Inject into LocalBusiness script
indexHtml = indexHtml.replace(
    /"addressRegion": "MA",\s*"postalCode": "01754",\s*"addressCountry": "US"\s*}/i,
    `"addressRegion": "MA",\n        "postalCode": "01754",\n        "addressCountry": "US"\n      },${areaServedJson}`
);

// Insert Areas We Serve Section
const areasSection = `
    <!-- Areas We Serve SEO Section -->
    <section class="areas-served-section" style="padding: 4rem 0; background-color: var(--white); border-top: 2px solid var(--primary-black);">
        <div class="container">
            <h2 class="section-title" style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Service Areas in Massachusetts</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto 2rem auto; font-size: 1.1rem; color: var(--text-dark);">
                Waste Universe is proud to be a locally owned and operated business. We provide reliable residential trash pickup, commercial waste management, and dumpster rentals to our neighbors in:
            </p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; max-width: 900px; margin: 0 auto;">
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--sand); border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Maynard (HQ)</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--forest-green); color: white; border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Littleton</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--forest-green); color: white; border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Littleton Common</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--sand); border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Stow</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--sand); border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Acton</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--sand); border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Harvard</span>
                <span class="badge" style="padding: 0.5rem 1rem; background-color: var(--sand); border: 2px solid var(--primary-black); border-radius: 4px; font-weight: 600;">📍 Concord</span>
            </div>
        </div>
    </section>

`;

if (!indexHtml.includes('Service Areas in Massachusetts')) {
    indexHtml = indexHtml.replace('    <!-- Footer -->', areasSection + '    <!-- Footer -->');
}
fs.writeFileSync('index.html', indexHtml);
console.log('Updated index.html SEO');


// 2. Update services.html
if (fs.existsSync('services.html')) {
    let servicesHtml = fs.readFileSync('services.html', 'utf8');
    servicesHtml = servicesHtml.replace(
        /<meta name="description" content="[^"]*">/i,
        `<meta name="description" content="Comprehensive waste collection for homes and businesses. Request a quote for reliable trash pickup and recycling in Maynard, Littleton, Stow, Acton, Harvard, and Concord MA.">`
    );
    fs.writeFileSync('services.html', servicesHtml);
    console.log('Updated services.html SEO');
}
