const fs = require('fs');

const CITIES = [
    {
        slug: 'dumpster-rental-littleton-ma',
        city: 'Littleton',
        state: 'MA',
        title: 'Dumpster Rental in Littleton, MA | Waste Universe',
        metaDescription: 'Need a dumpster rental in Littleton, MA? Waste Universe provides reliable roll-off dumpster delivery for cleanouts, renovations, and construction projects with straightforward pricing.',
        h1: 'Dumpster Rental in Littleton, MA',
        heroCopy: 'Clearing out a home, renovating a property, or managing a job site in Littleton? Waste Universe makes dumpster rental simple with reliable delivery, flexible dumpster sizes, and straightforward service.',
        primaryKeyword: 'dumpster rental Littleton MA',
        localSectionHeading: 'Reliable Dumpster Rentals for Littleton Projects',
        localSectionCopy: '<p>From household cleanouts to remodeling debris and active construction projects, Littleton customers need a waste solution that arrives when expected and does not turn disposal into another project. Waste Universe provides roll-off dumpster rentals for homeowners, contractors, property managers, and local businesses throughout Littleton, Massachusetts.</p><p>Choose the dumpster size that fits your project, schedule delivery, fill the container, and arrange pickup. Our goal is to keep the process simple from the first booking through final removal.</p>',
        projectSectionHeading: 'Dumpster Rentals for Cleanouts, Renovations, and Construction',
        projectList: ['garage and basement cleanouts', 'moving and property cleanouts', 'roofing debris', 'kitchen and bathroom renovations', 'estate cleanouts', 'contractor projects', 'landscaping debris where accepted', 'general construction waste'],
        faq: [
            { q: 'What size dumpster do I need in Littleton?', a: 'It depends on your project. A 10-yard is great for minor cleanouts, while 20- or 30-yard dumpsters handle major renovations.' },
            { q: 'How quickly can a dumpster be delivered to Littleton, MA?', a: 'We typically offer next-day delivery depending on current availability.' },
            { q: 'Can I rent a dumpster for a home cleanout?', a: 'Absolutely. Many of our Littleton customers rent dumpsters specifically for household cleanouts and moving prep.' },
            { q: 'Do I need a permit for a dumpster in Littleton?', a: 'Requirements depend on placement. If placing it on a public street, you may need a permit from the town of Littleton. Driveway placement typically does not require one.' },
            { q: 'What materials cannot go in the dumpster?', a: 'Hazardous materials, wet paint, tires, and certain electronics are prohibited. We will provide a full list upon booking.' }
        ],
        cta: 'Book a Dumpster in Littleton',
        crossLinks: ['Harvard', 'Acton', 'Stow']
    },
    {
        slug: 'dumpster-rental-littleton-common-ma',
        city: 'Littleton Common',
        state: 'MA',
        title: 'Dumpster Rental in Littleton Common, MA | Waste Universe',
        metaDescription: 'Fast, straightforward dumpster rentals in Littleton Common, MA for home cleanouts, renovations, property projects, and construction debris.',
        h1: 'Dumpster Rental in Littleton Common, MA',
        heroCopy: 'Need extra space for debris from a cleanout or renovation? Waste Universe provides convenient dumpster rentals for residential and commercial projects in the Littleton Common area.',
        primaryKeyword: 'dumpster rental Littleton Common MA',
        localSectionHeading: 'Simple Waste Removal for Littleton Common Properties',
        localSectionCopy: '<p>A renovation or major cleanout can create more debris than regular trash service is designed to handle. Waste Universe gives Littleton Common homeowners, property managers, and contractors a straightforward way to keep waste contained and projects moving.</p><p>Our roll-off dumpsters are suited to everything from accumulated household junk to renovation and construction debris. Select an appropriate container, arrange delivery, and contact us when the project is ready for pickup.</p>',
        faq: [
            { q: 'Can a dumpster be delivered to a residential property in Littleton Common?', a: 'Yes, we routinely deliver to residential driveways across Littleton Common.' },
            { q: 'Which dumpster size is best for a home cleanout?', a: 'A 15-yard or 20-yard dumpster usually offers the best balance of space and footprint for most home cleanouts.' },
            { q: 'Can contractors rent dumpsters from Waste Universe?', a: 'Yes, we partner with local contractors for ongoing and one-off project needs.' },
            { q: 'How long can I keep my dumpster?', a: 'Our standard rental period is up to 10 days, with flexible options if you need it longer.' },
            { q: 'How do I schedule pickup?', a: 'Simply give us a call or schedule online when you are finished.' }
        ],
        cta: 'Rent a Dumpster in Littleton Common',
        crossLinks: ['Littleton', 'Acton']
    },
    {
        slug: 'dumpster-rental-stow-ma',
        city: 'Stow',
        state: 'MA',
        title: 'Dumpster Rental in Stow, MA | Waste Universe',
        metaDescription: 'Waste Universe provides dependable dumpster rentals in Stow, MA for cleanouts, remodeling projects, roofing debris, and construction waste.',
        h1: 'Dumpster Rental in Stow, MA',
        heroCopy: 'Big project, growing debris pile? Waste Universe provides dependable roll-off dumpster rentals for homeowners, contractors, and property projects throughout Stow.',
        primaryKeyword: 'dumpster rental Stow MA',
        localSectionHeading: 'A Better Way to Handle Project Debris in Stow',
        localSectionCopy: '<p>Home projects have a habit of producing more waste than expected. Old materials, damaged fixtures, packaging, and general debris can quickly take over a driveway or work area. A roll-off dumpster keeps the waste in one place and gives your project a clear disposal plan.</p><p>Waste Universe serves Stow with dumpster options for residential cleanouts, renovation projects, roofing work, and construction debris.</p>',
        faq: [
            { q: 'What dumpster size works for a Stow home renovation?', a: 'For medium renovations, a 20-yard is usually ideal.' },
            { q: 'Can roofing materials go in a dumpster?', a: 'Yes, roofing shingles are accepted, but weight limits apply. Contact us for specific roofing guidelines.' },
            { q: 'Where should the dumpster be placed?', a: 'A flat, paved driveway is usually the best location.' },
            { q: 'How does dumpster delivery work?', a: 'Our driver will carefully place the dumpster in your designated area on the scheduled date.' },
            { q: 'When should I schedule my dumpster?', a: 'We recommend booking 2-3 days in advance to ensure availability.' }
        ],
        cta: 'Check Dumpster Availability in Stow',
        crossLinks: ['Maynard', 'Acton', 'Harvard']
    },
    {
        slug: 'dumpster-rental-acton-ma',
        city: 'Acton',
        state: 'MA',
        title: 'Dumpster Rental in Acton, MA | Waste Universe',
        metaDescription: 'Rent a dumpster in Acton, MA for home cleanouts, renovations, roofing, and construction projects. Reliable delivery from Waste Universe.',
        h1: 'Dumpster Rental in Acton, MA',
        heroCopy: 'Waste Universe provides straightforward dumpster rentals for Acton homeowners, contractors, and property professionals. Choose a container for your project and keep debris under control from start to finish.',
        primaryKeyword: 'dumpster rental Acton MA',
        localSectionHeading: 'Roll-Off Dumpster Rentals for Acton Homes and Job Sites',
        localSectionCopy: '<p>Whether you are clearing years of accumulated household items or removing construction debris from an active project, the right dumpster can make waste removal significantly easier.</p><p>Waste Universe provides dumpster rentals for projects throughout Acton. Our service is designed for homeowners who want a simple booking experience and professionals who need dependable waste removal for ongoing work.</p>',
        projectSectionHeading: 'Dumpster Rentals for Acton Contractors',
        projectList: ['remodeling', 'roofing', 'property rehabilitation', 'demolition debris where accepted', 'construction cleanup', 'recurring project needs'],
        faq: [
            { q: 'Do you provide contractor dumpster rentals in Acton?', a: 'Yes, we provide reliable service for local Acton contractors and recurring project needs.' },
            { q: 'What dumpster size should I choose for a renovation?', a: 'Our 20-yard and 30-yard dumpsters are most popular for extensive remodeling projects.' },
            { q: 'Can I rent a dumpster for an estate cleanout?', a: 'Absolutely. We regularly supply dumpsters for estate cleanouts to make the process easier.' },
            { q: 'How does delivery and pickup work?', a: 'We deliver directly to your property and pick up the dumpster when you tell us you are finished.' },
            { q: 'What items are prohibited?', a: 'Hazardous materials, wet paint, chemicals, and tires are strictly prohibited.' }
        ],
        cta: 'Book an Acton Dumpster',
        crossLinks: ['Concord', 'Littleton', 'Stow']
    },
    {
        slug: 'dumpster-rental-harvard-ma',
        city: 'Harvard',
        state: 'MA',
        title: 'Dumpster Rental in Harvard, MA | Waste Universe',
        metaDescription: 'Reliable dumpster rentals in Harvard, MA for property cleanouts, home renovations, construction projects, and general debris removal.',
        h1: 'Dumpster Rental in Harvard, MA',
        heroCopy: 'Cleaning up a property or starting a renovation in Harvard? Waste Universe provides dependable roll-off dumpsters designed to keep debris contained and waste removal straightforward.',
        primaryKeyword: 'dumpster rental Harvard MA',
        localSectionHeading: 'Dumpster Rentals for Harvard Property Projects',
        localSectionCopy: '<p>Property cleanups and renovations can generate a surprising amount of material. Instead of relying on repeated disposal trips, a roll-off dumpster gives you one central place to manage project debris.</p><p>Waste Universe provides dumpster rental service in Harvard for homeowners, contractors, and property professionals handling cleanouts, renovations, and construction projects.</p>',
        faq: [
            { q: 'Can I rent a dumpster for a property cleanout in Harvard?', a: 'Yes, our dumpsters are perfect for large-scale property cleanups.' },
            { q: 'Which dumpster size is best for renovation debris?', a: 'A 20-yard dumpster is our most versatile size for renovations.' },
            { q: 'How much space is needed for dumpster delivery?', a: 'We need a clear path and sufficient height clearance (no low branches or wires) to safely drop the container.' },
            { q: 'How do I arrange pickup?', a: 'Just contact our dispatch team or use our online system when you are ready.' },
            { q: 'What cannot be placed in a Waste Universe dumpster?', a: 'Tires, liquids, hazardous chemicals, and certain appliances are not allowed.' }
        ],
        cta: 'Get a Dumpster in Harvard',
        crossLinks: ['Littleton', 'Acton']
    },
    {
        slug: 'dumpster-rental-maynard-ma',
        city: 'Maynard',
        state: 'MA',
        title: 'Dumpster Rental in Maynard, MA | Waste Universe',
        metaDescription: 'Need a dumpster rental in Maynard, MA? Waste Universe provides convenient roll-off dumpsters for cleanouts, remodeling, and construction projects.',
        h1: 'Dumpster Rental in Maynard, MA',
        heroCopy: 'From household cleanouts to renovation debris, Waste Universe helps Maynard customers keep projects cleaner with convenient roll-off dumpster rentals and straightforward scheduling.',
        primaryKeyword: 'dumpster rental Maynard MA',
        localSectionHeading: 'Simple Dumpster Rental for Maynard Projects',
        localSectionCopy: '<p>When debris starts filling a garage, driveway, or work area, a dumpster can turn a messy project into a manageable one. Waste Universe provides roll-off dumpster rentals for Maynard homeowners, contractors, and property managers.</p><p>Our dumpsters can support home cleanouts, moving projects, remodeling work, roofing projects, and other approved waste disposal needs.</p>',
        faq: [
            { q: 'Can I rent a dumpster for a Maynard home cleanout?', a: 'Yes! We serve many homeowners in Maynard for cleanouts and moving preparation.' },
            { q: 'What dumpster size works for remodeling debris?', a: '20-yard containers are the gold standard for most remodeling debris.' },
            { q: 'How far in advance should I schedule delivery?', a: 'Aim for 2-3 days prior to your project start date.' },
            { q: 'Can the dumpster be placed in my driveway?', a: 'Yes, driveway placement is the most common and convenient option.' },
            { q: 'How do I request dumpster pickup?', a: 'Call or book online when you are ready for removal.' }
        ],
        cta: 'Rent a Dumpster in Maynard',
        crossLinks: ['Stow', 'Acton', 'Concord']
    },
    {
        slug: 'dumpster-rental-concord-ma',
        city: 'Concord',
        state: 'MA',
        title: 'Dumpster Rental in Concord, MA | Waste Universe',
        metaDescription: 'Waste Universe offers reliable dumpster rentals in Concord, MA for home cleanouts, renovations, contractor projects, and construction debris.',
        h1: 'Dumpster Rental in Concord, MA',
        heroCopy: 'Planning a cleanout, remodel, or construction project in Concord? Waste Universe provides reliable roll-off dumpster rentals with a simple delivery and pickup process.',
        primaryKeyword: 'dumpster rental Concord MA',
        localSectionHeading: 'Waste Removal for Concord Renovations and Property Projects',
        localSectionCopy: '<p>A well-planned renovation or property cleanup needs an equally clear plan for debris. Waste Universe provides dumpster rentals in Concord for homeowners, property professionals, and contractors who need a convenient way to contain and remove project waste.</p><p>From interior remodeling debris to large household cleanouts, our roll-off dumpsters help keep materials consolidated while work is underway.</p>',
        faq: [
            { q: 'What dumpster size should I rent in Concord?', a: 'For heavy materials, smaller is better. For bulky cleanouts, a 20 or 30-yard works well.' },
            { q: 'Can I use a dumpster for renovation debris?', a: 'Yes, it is the most efficient way to handle renovation tear-outs.' },
            { q: 'Do you work with contractors and property managers?', a: 'Yes, we provide reliable, recurring service for Concord contractors.' },
            { q: 'Where can the dumpster be placed?', a: 'Driveways are best. Street placement may require a permit from the town of Concord.' },
            { q: 'How does pickup work after my project is complete?', a: 'Simply reach out and we will haul it away promptly.' }
        ],
        cta: 'Check Concord Dumpster Availability',
        crossLinks: ['Acton', 'Maynard', 'Littleton']
    }
];

const templateHtml = fs.readFileSync('dumpster-rentals.html', 'utf8');

function generateFAQSchema(faqs) {
    if (!faqs || faqs.length === 0) return '';
    const mainEntity = faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
        }
    }));
    return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(mainEntity, null, 2)}
    }
    </script>
    `;
}

function generateLocalBusinessSchema(city, state) {
    return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Waste Universe",
      "url": "https://wasteuniverse.com",
      "telephone": "+14012139516",
      "areaServed": {
        "@type": "City",
        "name": "${city}",
        "containedInPlace": {
            "@type": "State",
            "name": "${state}"
        }
      }
    }
    </script>
    `;
}

function generateCrossLinks(crossLinks) {
    if (!crossLinks || crossLinks.length === 0) return '';
    let linksHtml = crossLinks.map(l => `<a href="dumpster-rental-${l.toLowerCase().replace(' ', '-')}-ma.html" style="color: var(--forest-green); font-weight: bold;">${l}</a>`).join(', ');
    return `<p style="margin-top: 2rem; padding: 1rem; background: var(--off-white); border-radius: 8px;">We also provide dumpster rentals in ${linksHtml}.</p>`;
}

for (let cityData of CITIES) {
    let newHtml = templateHtml;

    // Replace Title
    newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>${cityData.title}</title>`);
    
    // Replace Meta Desc
    newHtml = newHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${cityData.metaDescription}">`);

    // Replace H1
    newHtml = newHtml.replace(/<h1>.*?<\/h1>/, `<h1>${cityData.h1}</h1>`);

    // Replace Hero Text (the <p> immediately following H1)
    newHtml = newHtml.replace(
        /(<h1>.*?<\/h1>\s*<p[^>]*>)(.*?)(<\/p>)/, 
        `$1${cityData.heroCopy}$3`
    );

    // Build the injected SEO body
    let seoBody = `
    <section class="local-seo-content" style="padding: 4rem 0; background: #fff; border-top: 1px solid #eee;">
        <div class="container" style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary-black);">${cityData.localSectionHeading}</h2>
            <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text-dark); margin-bottom: 3rem;">
                ${cityData.localSectionCopy}
            </div>
    `;

    if (cityData.projectSectionHeading) {
        seoBody += `
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary-black);">${cityData.projectSectionHeading}</h2>
            <ul style="margin-bottom: 3rem; font-size: 1.1rem; padding-left: 1.5rem; color: var(--text-dark);">
                ${cityData.projectList.map(p => `<li style="margin-bottom: 0.5rem;">${p}</li>`).join('')}
            </ul>
        `;
    }

    if (cityData.faq) {
        seoBody += `
            <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--primary-black);">Frequently Asked Questions</h2>
            <div class="faq-list">
                ${cityData.faq.map(f => `
                    <div style="margin-bottom: 1.5rem; background: var(--off-white); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--forest-green);">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: bold;">${f.q}</h3>
                        <p style="color: var(--text-dark);">${f.a}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Add cross links
    seoBody += generateCrossLinks(cityData.crossLinks);

    seoBody += `
        </div>
    </section>
    `;

    // Inject SEO body right before the Footer
    newHtml = newHtml.replace('<!-- Footer -->', seoBody + '\n    <!-- Footer -->');

    // Replace the CTA in the header (if present)
    newHtml = newHtml.replace(
        /(Not sure which dumpster you need\? Ask us: <a href="tel:4012139516"[^>]*>\(401\) 213-9516<\/a> 👋)/,
        `${cityData.cta}: <a href="tel:4012139516" style="color: var(--primary-black); text-decoration: none;">(401) 213-9516</a> 👋`
    );

    // Inject Schemas before </head>
    const schemas = generateLocalBusinessSchema(cityData.city, cityData.state) + generateFAQSchema(cityData.faq);
    newHtml = newHtml.replace('</head>', schemas + '\n</head>');

    // Add self-referencing canonical
    const canonical = `<link rel="canonical" href="https://wasteuniverse.com/${cityData.slug}.html" />`;
    newHtml = newHtml.replace('</head>', canonical + '\n</head>');

    // Write file
    fs.writeFileSync(`${cityData.slug}.html`, newHtml);
    console.log(`Generated: ${cityData.slug}.html`);
}
