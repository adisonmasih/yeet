const doOverlay = require('../core/helpers/overlay');

(async function () {
    let overlay = await doOverlay({
        target: 'cock.jpg',
        overlayUrl: "https://thumbs.dreamstime.com/b/blank-red-paper-texture-background-christmas-155990761.jpg" ,
        resizeDimensions: {
            height: 110,
            width: 110,
        },
        placement: {
            X: 280,
            Y: 42,
        },
        assetsDir: '../assets/',
        outputsDir: '../outputs/',
    })
    console.log(overlay)
})()