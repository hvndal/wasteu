const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace style.css or style.css?v=2 with style.css?v=3
    content = content.replace(/assets\/css\/style\.css(\?v=\d+)?/g, 'assets/css/style.css?v=3');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated CSS version in ' + file);
}
