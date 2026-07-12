const blogPosts = [
    {
        id: 1,
        title: "The Ultimate Guide to Choosing the Right Dumpster Size",
        date: "May 12, 2026",
        author: "Connor",
        category: "Guides",
        image: "assets/images/dumpster_20.jpg",
        excerpt: "Not sure whether you need a 10-yard or 30-yard dumpster for your project? We break down exactly what fits in each size so you never overpay.",
        content: `
            <p>One of the most common questions we get at Waste Universe is: <strong>"What size dumpster do I actually need?"</strong></p>
            <p>Choosing the wrong size can lead to frustrating delays or paying for empty space. Here is our simple guide to picking the perfect roll-off for your project.</p>
            
            <h3>10-Yard Dumpsters</h3>
            <p>Perfect for small cleanouts and minor projects. This fits about 3 pickup truck loads of debris. Use this for:</p>
            <ul>
                <li>Small bathroom remodels</li>
                <li>Spring cleaning a garage or basement</li>
                <li>Yard waste and small deck removals</li>
            </ul>

            <h3>15-Yard Dumpsters</h3>
            <p>The "sweet spot" for medium projects. It holds roughly 4.5 pickup trucks of waste.</p>
            <ul>
                <li>Medium kitchen renovations</li>
                <li>Roofing material removals (shingles)</li>
                <li>Large flooring replacements</li>
            </ul>

            <h3>20-Yard and 30-Yard Dumpsters</h3>
            <p>For serious construction and full home cleanouts. These are our workhorses.</p>
            <ul>
                <li>Whole-home renovations</li>
                <li>Major landscaping projects</li>
                <li>Commercial property cleanouts</li>
            </ul>

            <p>Still unsure? Give us a call. Our dispatch team is happy to walk through your project and recommend the most cost-effective size.</p>
        `
    },
    {
        id: 2,
        title: "5 Things You Should NEVER Put in a Residential Trash Bin",
        date: "April 28, 2026",
        author: "Peter",
        category: "Sustainability",
        image: "assets/images/trash_collection.jpg",
        excerpt: "Keep our drivers safe and avoid hefty fines by keeping these 5 hazardous items out of your weekly residential trash pickup.",
        content: `
            <p>Our drivers work hard to keep neighborhoods clean, but certain items can cause fires, chemical spills, or severe damage to our trucks. Here are 5 things you must keep out of your bin.</p>
            
            <h3>1. Lithium-Ion Batteries</h3>
            <p>These are the number one cause of garbage truck fires nationwide. Never toss old laptops, cell phones, or rechargeable tool batteries in the trash. They must be taken to an e-waste recycling center.</p>

            <h3>2. Wet Paint and Chemicals</h3>
            <p>Liquid paint can spill onto the street when compacted. If you need to dispose of latex paint, mix it with kitty litter until it dries completely solid, then it can safely go in the trash.</p>

            <h3>3. Motor Oil and Automotive Fluids</h3>
            <p>Highly toxic to the environment. Most auto parts stores will accept used motor oil for free recycling.</p>

            <h3>4. Tires</h3>
            <p>Tires cannot be processed at standard landfills because they trap methane gas and float to the surface over time. We offer special tire pickup services upon request.</p>

            <h3>5. Construction Debris (Concrete/Bricks)</h3>
            <p>Your standard weekly bin cannot handle the immense weight of concrete. If you are doing construction, you need to rent a roll-off dumpster.</p>
            
            <p>Thank you for helping us keep the community safe and clean!</p>
        `
    },
    {
        id: 3,
        title: "How Local Waste Management is Evolving in Massachusetts",
        date: "April 15, 2026",
        author: "Connor",
        category: "Industry News",
        image: "assets/images/dumpster_truck.jpg",
        excerpt: "From new recycling mandates to advanced routing software, here is how Waste Universe is keeping up with the changing landscape of MA waste disposal.",
        content: `
            <p>The waste management industry is changing rapidly, especially here in Massachusetts where environmental regulations are leading the country.</p>
            
            <h3>The Push for Zero Waste</h3>
            <p>New state mandates are making it harder to simply throw everything into a landfill. We are investing heavily in sorting partnerships to ensure that recyclable materials—especially clean cardboard and metals—are diverted from landfills.</p>

            <h3>Smart Routing Technology</h3>
            <p>At Waste Universe, we aren't just relying on old maps. We use advanced routing software to minimize our trucks' time on the road. This reduces our carbon footprint, cuts down on noise in your neighborhood, and keeps our prices highly competitive.</p>

            <h3>Community First</h3>
            <p>Despite the high-tech upgrades, our core remains the same: we are a family-owned business serving our neighbors. When you call us, you speak to a local, not a massive overseas call center.</p>

            <p>We're excited for the future of clean, efficient waste management in New England.</p>
        `
    }
];

// Helper function to render a single blog card
function createBlogCard(post) {
    return \`
        <article class="blog-card" style="background: var(--white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-solid); transition: var(--transition); border: var(--border-thin); display: flex; flex-direction: column;">
            <div class="blog-card-img" style="height: 220px; overflow: hidden; position: relative;">
                <img src="\${post.image}" alt="\${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
                <span style="position: absolute; top: 16px; left: 16px; background: rgba(16, 30, 74, 0.9); color: var(--gold); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">\${post.category}</span>
            </div>
            <div class="blog-card-content" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>\${post.date}</span>
                    <span>By \${post.author}</span>
                </div>
                <h3 style="font-size: 1.25rem; color: var(--forest-green); margin-bottom: 12px; font-weight: 800; line-height: 1.3;">\${post.title}</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px; flex-grow: 1;">\${post.excerpt}</p>
                <a href="post.html?id=\${post.id}" class="blog-read-more" style="color: var(--emerald); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 6px;">Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
        </article>
    \`;
}
