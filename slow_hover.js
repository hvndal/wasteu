
const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

css = css.replace(/0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\)/g, '1.5s ease-out');

fs.writeFileSync('assets/css/style.css', css, 'utf8');
console.log('CSS transitions slowed down to 1.5s');

