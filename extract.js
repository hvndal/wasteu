const sharp = require('sharp');
const fs = require('fs');

const imgPath = 'C:/Users/herma/.gemini/antigravity/brain/c1aecd22-14d2-4685-8323-5eec80b289e0/media__1783511094406.png';
const outDir = 'c:/Users/herma/Videos/WasteUniverse/assets/images/';

// Precise crop boxes based on ASCII map
// Radius is roughly 40-50px.
// Connor center: ~ (51, 51) => Box [0, 0, 110, 110]
// Peter center: ~ (389, 51) => Box [334, 0, 110, 110]
// Mike center: ~ (51, 392) => Box [0, 337, 110, 110]
// John center: ~ (389, 392) => Box [334, 337, 110, 110]
const avatars = [
    { name: 'connor', left: 0, top: 0 },
    { name: 'peter', left: 334, top: 0 },
    { name: 'mike', left: 0, top: 337 },
    { name: 'john', left: 334, top: 337 },
];

avatars.forEach(avatar => {
    sharp(imgPath)
        .extract({ left: avatar.left, top: avatar.top, width: 110, height: 110 })
        .toFile(outDir + avatar.name + '.png')
        .then(() => console.log('Saved', avatar.name))
        .catch(err => console.error('Error extracting', avatar.name, err));
});
