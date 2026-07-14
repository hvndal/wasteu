const fs = require('fs');

// Fix blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');
blogHtml = blogHtml.replace('By IT & Marketing | July 10, 2026', 'By Herman | July 10, 2026');
blogHtml = blogHtml.replace('By IT & Marketing', 'By Herman');
blogHtml = blogHtml.replace(/<div class="byline".*?>By The Founder<\/div>\s*/g, '');
blogHtml = blogHtml.replace(/<div class="byline".*?>By Regional Management<\/div>\s*/g, '');
blogHtml = blogHtml.replace(/<div class="byline".*?>By Dispatch Operations<\/div>\s*/g, '');
blogHtml = blogHtml.replace(/<div class="byline".*?>By The Operations Team<\/div>\s*/g, '');
fs.writeFileSync('blog.html', blogHtml);
console.log('Fixed blog.html');

// Fix index.html review bodies
let indexHtml = fs.readFileSync('index.html', 'utf8');
// The names inside the review texts are Peter, John, Damien.
indexHtml = indexHtml.replace(/Peter dropped the dumpster exactly where I needed it/g, 'they dropped the dumpster exactly where I needed it');
indexHtml = indexHtml.replace(/John is always on time, friendly, and even waves/g, 'the driver is always on time, friendly, and even waves');
indexHtml = indexHtml.replace(/and Damien handled it perfectly/g, 'and the driver handled it perfectly');
fs.writeFileSync('index.html', indexHtml);
console.log('Fixed index.html');
