const fs = require('fs');

['index.html', 'services.html', 'blog.html', 'weather.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    console.log('File:', f);
    console.log('Title:', (html.match(/<title>(.*?)<\/title>/i) || [])[1]);
    console.log('Desc:', (html.match(/<meta name="description" content="(.*?)">/i) || [])[1]);
    console.log('H1:', (html.match(/<h1.*?>(.*?)<\/h1>/i) || [])[1]?.substring(0,50));
    console.log('---');
});
