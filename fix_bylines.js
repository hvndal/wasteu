const fs = require('fs');
let html = fs.readFileSync('blog.html', 'utf8');

html = html.replace('By Herman (IT & Marketing) | July 10, 2026', 'By IT & Marketing | July 10, 2026');
html = html.replace('By Herman (Marketing & IT)', 'By IT & Marketing');
html = html.replace(/By Connor \(Owner\)/g, 'By The Founder');
html = html.replace('By Erik (Regional Director)', 'By Regional Management');
html = html.replace('By Peter (Operations)', 'By Dispatch Operations');

fs.writeFileSync('blog.html', html);
console.log('Fixed bylines');
