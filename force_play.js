
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the poster from the hero video
html = html.replace(/<video id="hero-video" autoplay loop muted playsinline poster="assets\/images\/hero-fallback\.jpg" class="hero-bg" style="object-fit: cover; object-position: center;">\s*<source src="assets\/video\/hero\.mp4" type="video\/mp4">\s*<\/video>/, 
`<video id="hero-video" autoplay loop muted playsinline class="hero-bg" style="object-fit: cover; object-position: center;">
</video>
<script>
    (function() {
        var video = document.getElementById("hero-video");
        var source = document.createElement("source");
        source.src = "assets/video/hero.mp4";
        source.type = "video/mp4";
        video.appendChild(source);
        
        // Force load and play to bypass strict browser policies
        video.load();
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                console.log("Autoplay blocked:", error);
            });
        }
    })();
</script>`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated to remove fallback image and force video play');

