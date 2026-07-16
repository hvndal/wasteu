const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\herma\\Videos\\WasteUniverse';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldModalContentRegex = /<div class="modal-content" style="background: var\(--off-white\); max-width: 400px; padding: 2\.5rem; text-align: center; border: 3px solid var\(--primary-black\); border-radius: 16px;">[\s\S]*?<\/div>[\s\S]*?<\/div>/;

const staticModalContent = `<div class="modal-content" style="background: var(--off-white); max-width: 400px; padding: 2.5rem; text-align: center; border: 3px solid var(--primary-black); border-radius: 16px;">
            <div class="modal-header" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.8rem; margin: 0; color: var(--primary-black);">Get in Touch</h3>
                <p style="color: var(--text-dark); margin-top: 0.5rem; font-size: 1.1rem;">We're here to help.</p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <a href="tel:4012139516" class="btn btn-forest" style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 16px; font-size: 1.1rem;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    (401) 213-9516
                </a>
                
                <a href="mailto:dispatch@wasteuniverse.com" class="btn btn-outline" style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 16px; font-size: 1.1rem; border-width: 2px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email Dispatch
                </a>
            </div>
            
            <button class="btn btn-outline" onclick="closeContactModal()" style="margin-top: 2rem; width: 100%; border: none; background: transparent; color: var(--text-light); text-decoration: underline;">
                Close
            </button>
        </div>
    </div>`;

const inlineWebformRegex = /<!-- Contact Section -->[\s\S]*?<section class="contact-section animate-on-scroll" id="contact-form-section"[\s\S]*?<\/section>/;
const staticInlineContact = `<!-- Contact Section -->
    <section class="contact-section animate-on-scroll" id="contact-form-section" style="padding: 80px 0; background-color: var(--primary-black); color: var(--cream);">
        <div class="container" style="text-align: center;">
            <h2 class="contact-title" style="margin-bottom: 1rem;">Get In Touch</h2>
            <p class="contact-desc" style="max-width: 560px; margin: 0 auto 2.5rem auto; color: rgba(255,255,255,0.7);">
                Have a question or ready to book? Give us a call or drop us an email — our team is standing by.
            </p>
            <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <a href="tel:4012139516" class="btn btn-forest" style="font-size: 1.1rem; padding: 14px 32px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    (401) 213-9516
                </a>
                <a href="mailto:dispatch@wasteuniverse.com" class="btn btn-outline" style="font-size: 1.1rem; padding: 14px 32px; color: var(--cream); border-color: var(--cream);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    dispatch@wasteuniverse.com
                </a>
            </div>
        </div>
    </section>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace modal
    const modalMatch = content.match(oldModalContentRegex);
    if (modalMatch) {
        content = content.replace(oldModalContentRegex, staticModalContent);
    }
    
    // Replace inline form on index.html
    if (file === 'index.html') {
        const inlineMatch = content.match(inlineWebformRegex);
        if (inlineMatch) {
            content = content.replace(inlineWebformRegex, staticInlineContact);
        }
    }
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Reverted forms in ' + file);
});
