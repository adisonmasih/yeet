const doTextOverlay = require('../core/helpers/text_overlay');
const Jimp = require('jimp');

(async function () {
    let overlay = await doTextOverlay({
        target: 'location.png',
        texts: [
          {
              content: 'My Sample Text',
              X: 32,
              Y: 154,
              font: Jimp.FONT_SANS_14_BLACK,
          },
          {
              content: 'Adison Wants To',
              X: 156,
              Y: 320,
              font: Jimp.FONT_SANS_16_BLACK,
          },
        ],
        assetsDir: '../assets/',
        outputsDir: '../outputs/',
    })
    console.log(overlay)
})()