const fs = require('fs');

const path = require('path');

function walk(dir, extArray) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
            results = results.concat(walk(file, extArray));
        } else {
            if (extArray.includes(path.extname(file))) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.', ['.html', '.js']);

const replacements = [
    [//g, ''],
    [//g, ''],
    [//g, ''],
    [/ in MA/g, ' in MA'],
    [/, \{\"@type\": \"State\", \"name\": \"Rhode Island\"\}/g, ''],
    [/Massachusetts/g, 'Massachusetts'],
    [/MA/g, 'MA'],
    [/PROUDLY SERVING MASSACHUSETTS/g, 'PROUDLY SERVING MASSACHUSETTS'],
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    replacements.forEach(r => {
        content = content.replace(r[0], r[1]);
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Cleaned Rhode Island from: ' + file);
    }
});
