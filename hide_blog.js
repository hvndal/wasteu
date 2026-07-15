const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Hide blog links by wrapping in an HTML comment, or removing them.
    // Let's just remove them entirely for now to be clean, or comment them out.
    // We'll replace the line containing blog.html with a comment, but only if it's in the nav.
    // Actually, simple regex to comment out the <a> tag:
    content = content.replace(/<a href="blog\.html"(.*?)>Blog<\/a>/g, '<!-- <a href="blog.html"$1>Blog</a> -->');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Hid blog in ${file}`);
}
