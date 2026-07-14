const fs = require('fs');

let html = fs.readFileSync('dumpster-rentals.html', 'utf8');

html = html.replace(
    /<a href="tel:4012139516" class="btn btn-forest" style="width:100%; text-align:center;">Order Online<\/a>/g,
    function(match, offset) {
        // We'll replace it with checkout.html?size=
        // Since we can't easily capture the size from regex dynamically here, let's just do it manually by finding the surrounding blocks.
        return `<a href="checkout.html" class="btn btn-forest" style="width:100%; text-align:center;">Order Online</a>`;
    }
);

// Better way: let's replace specific product cards with the size param.
html = html.replace(
    /<div class="dumpster-card">[\s\S]*?<h3>10 Yard Dumpster<\/h3>[\s\S]*?<a href="tel:4012139516" class="btn btn-forest" style="width:100%; text-align:center;">Order Online<\/a>/,
    match => match.replace('tel:4012139516', 'checkout.html?size=10-yard-dumpster')
);
html = html.replace(
    /<div class="dumpster-card">[\s\S]*?<h3>15 Yard Dumpster<\/h3>[\s\S]*?<a href="tel:4012139516" class="btn btn-forest" style="width:100%; text-align:center;">Order Online<\/a>/,
    match => match.replace('tel:4012139516', 'checkout.html?size=15-yard-dumpster')
);
html = html.replace(
    /<div class="dumpster-card">[\s\S]*?<h3>20 Yard Dumpster<\/h3>[\s\S]*?<a href="tel:4012139516" class="btn btn-forest" style="width:100%; text-align:center;">Order Online<\/a>/,
    match => match.replace('tel:4012139516', 'checkout.html?size=20-yard-dumpster')
);
html = html.replace(
    /<div class="dumpster-card">[\s\S]*?<h3>30 Yard Dumpster<\/h3>[\s\S]*?<a href="tel:4012139516" class="btn btn-forest" style="width:100%; text-align:center;">Order Online<\/a>/,
    match => match.replace('tel:4012139516', 'checkout.html?size=30-yard-dumpster')
);

fs.writeFileSync('dumpster-rentals.html', html);
console.log('Updated buttons');
