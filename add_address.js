const fs = require('fs');
const files = ['index.html'];

const addressHTML = `
                    <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light);">
                        <strong>Waste Universe LLC</strong><br>
                        34 Powder Mill Rd<br>
                        Maynard, MA 01754
                    </p>`;

files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Check if we already inserted it exactly in the footer
    if (!html.includes('Waste Universe LLC')) {
        // Insert after </form> in footer-brand
        html = html.replace(/(<div class="footer-brand">[\s\S]*?<\/form>)/, '$1' + addressHTML);
        fs.writeFileSync(f, html);
        console.log('Added address to ' + f);
    }
});
