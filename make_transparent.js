
const { Jimp } = require('jimp');
async function run() {
    try {
        const image = await Jimp.read('assets/images/logo_upscaled.jpg');
        image.scan((x, y, idx) => {
            const r = image.bitmap.data[idx];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];
            // If pixel is nearly white, make it transparent
            if (r > 230 && g > 230 && b > 230) {
                image.bitmap.data[idx + 3] = 0;
            }
        });
        await image.write('assets/images/logo_upscaled.png');
        console.log('Successfully created transparent PNG.');
    } catch (e) {
        console.error(e);
    }
}
run();

