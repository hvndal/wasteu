const fs = require('fs');

if (fs.existsSync('services.html')) {
    let servicesHtml = fs.readFileSync('services.html', 'utf8');

    const serviceAreasLinks = `
    <!-- Local SEO Service Areas Links -->
    <section class="seo-service-areas" style="padding: 3rem 0; background-color: var(--white); border-top: 1px solid #eee;">
        <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary-black);">Dumpster Rental Service Areas in Central Massachusetts</h2>
            <p style="color: var(--text-dark); margin-bottom: 1.5rem; font-size: 1rem;">
                Waste Universe provides dumpster rental service for homeowners, contractors, and property projects across communities in Central Massachusetts.
            </p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem;">
                <a href="dumpster-rental-littleton-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Littleton</a>
                <a href="dumpster-rental-littleton-common-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Littleton Common</a>
                <a href="dumpster-rental-stow-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Stow</a>
                <a href="dumpster-rental-acton-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Acton</a>
                <a href="dumpster-rental-harvard-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Harvard</a>
                <a href="dumpster-rental-maynard-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Maynard</a>
                <a href="dumpster-rental-concord-ma.html" style="color: var(--forest-green); text-decoration: none; font-weight: 500;">Concord</a>
            </div>
        </div>
    </section>
    `;

    if (!servicesHtml.includes('Dumpster Rental Service Areas in Central Massachusetts')) {
        servicesHtml = servicesHtml.replace('<!-- Footer -->', serviceAreasLinks + '\n    <!-- Footer -->');
        fs.writeFileSync('services.html', servicesHtml);
        console.log('Updated services.html with local links');
    } else {
        console.log('Links already present in services.html');
    }
}
