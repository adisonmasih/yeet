const Jimp = require('jimp') ;
const fs = require('fs');
const path = require('path');
const request = require('request');

function UnixTimestamp() {
  return (Date.now() / 1000) | 0;  
}


async function download (uri, outputsDir){
  let filename = UnixTimestamp().toString() + Math.floor(Math.random() * 69).toString() + `${path.extname(uri)}`
  const file = fs.createWriteStream(outputsDir + filename);
  await new Promise((resolve, reject) => {
      request(
          {uri, gzip: true}
       ).pipe(file).on('finish', async () => {
           console.log('finished downloading!')
           resolve()
       })
  })
  return filename;
};


async function imageOverlay({ target, overlayUrl, resizeDimensions, placement, outputsDir, assetsDir }) {
// Reading watermark Image
   let newFilename = UnixTimestamp().toString() + Math.floor(Math.random() * 6969).toString() + ".png";
   let overlay = await Jimp.read(overlayUrl);
   overlay = overlay.resize(resizeDimensions.width, resizeDimensions.height); // Resizing overlay image
   if(resizeDimensions.height == resizeDimensions.width) {
       overlay.circle()
   }
// Reading original image
   const image = await Jimp.read(assetsDir + target);
   overlay = await overlay
   
   image.composite(overlay, placement.X, placement.Y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1
   })
   
   
   await image.writeAsync(outputsDir + newFilename);
   return newFilename;
}

module.exports = imageOverlay;