const fs = require('fs');
let html = fs.readFileSync('blog.html', 'utf8');
let articles = html.split('<article');
articles.shift();
let ok = true;
articles.forEach((a, i) => {
    ['class="article-tag"', 'class="article-title"', 'class="byline"', 'class="article-image"', 'class="article-text"'].forEach(cls => {
        if (!a.includes(cls)) {
            console.log('Article', i, 'MISSING:', cls);
            ok = false;
        }
    });
});
if (ok) console.log('All articles have all required classes.');
