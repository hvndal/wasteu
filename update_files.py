import os

files = ['dumpster-rentals.html', 'services.html', 'weather.html']

widget_html = """
    <!-- Floating Contact Widget -->
    <div class="floating-contact">
        <a href="#" class="float-btn open-quote-modal" data-service="Contact Us" title="Call Us" style="font-size: 28px; text-decoration: none;">
            📞
        </a>
        <a href="#" class="float-btn open-quote-modal" data-service="Contact Us" title="Email Us" style="font-size: 28px; text-decoration: none;">
            ✉️
        </a>
    </div>
</body>"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace Blog link
    content = content.replace('<a href="index.html#blog">Blog</a>', '<a href="blog.html">Stories & Tips</a>')
    
    # Append widget right before </body>
    if "floating-contact" not in content:
        content = content.replace('</body>', widget_html)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
