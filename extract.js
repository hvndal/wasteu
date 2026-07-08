const sharp = require('sharp');
const fs = require('fs');

const imgPath = 'C:/Users/herma/.gemini/antigravity/brain/c1aecd22-14d2-4685-8323-5eec80b289e0/media__1783511094406.png';
const outDir = 'c:/Users/herma/Videos/WasteUniverse/assets/images/';

// We know the image is 1024 x 661. It's a grid of 3x2.
// Let's crop a generous 100x100 box around the expected avatar positions.
const avatars = [
    { name: 'connor', left: 25, top: 55 },
    { name: 'peter', left: 365, top: 55 },
    { name: 'mike', left: 25, top: 385 },
    { name: 'john', left: 365, top: 385 },
];

avatars.forEach(avatar => {
    sharp(imgPath)
        .extract({ left: avatar.left, top: avatar.top, width: 100, height: 100 })
        .toFile(outDir + avatar.name + '.png')
        .then(() => console.log('Saved', avatar.name))
        .catch(err => console.error('Error extracting', avatar.name, err));
});
