const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

// Replace the current :root variables with the original ones, up to --text-light
const rootRegex = /:root\s*\{[\s\S]*?--text-light:[^;]+;/;
const originalRoot = `:root {
    --primary-black: #1C201E;
    --forest-green: #173A2A;
    --emerald: #007261;
    --gold: #D1B48C;
    --gold-hover: #c4a376;
    --cream: #FDFDF5; 
    --white: #ffffff;
    
    --text-dark: #1b1e1d;
    --text-muted: #4a5550;
    --text-light: #e5efe9;`;
    
css = css.replace(rootRegex, originalRoot);

// Remove the [data-theme="dark"] block
const darkRegex = /\[data-theme="dark"\]\s*\{[^}]+\}/;
css = css.replace(darkRegex, '');

fs.writeFileSync('assets/css/style.css', css);
console.log('Restored original light theme colors.');
