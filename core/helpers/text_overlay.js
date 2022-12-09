const Jimp = require('jimp')
const fs = require('fs');
const path = require('path');

function UnixTimestamp() {
  return ((Date.now() / 1000) | 0).toString();  
}

async function textOverlay({ target, texts, assetsDir, outputsDir }) {
   var image = await Jimp.read(assetsDir + target);
   
//   await texts.forEach(async (text, index) => {
//       var font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
//       await image.print(font, text.X, text.Y, text.content);
//       console.log(image, text)
//   });
    var text = texts[0];
    var font = await Jimp.loadFont(text.font);
    image.print(font, text.X, text.Y, text.content, text.maxWidth, text.maxHeight);
    
    if(texts[1]) {
        text = texts[1];
        font = await Jimp.loadFont(text.font);
        image.print(font, text.X, text.Y, text.content, text.maxWidth, text.maxHeight);
    }
    
    if(texts[2]) {
        text = texts[2];
        font = await Jimp.loadFont(text.font);
        image.print(font, text.X, text.Y, text.content, text.maxWidth, text.maxHeight);
    }
    
    if(texts[3]) {
        text = texts[2];
        font = await Jimp.loadFont(text.font);
        image.print(font, text.X, text.Y, text.content, text.maxWidth, text.maxHeight);
    }

   
   var newFilename = UnixTimestamp() + Math.floor(Math.random() * 692) + ".png";
   await image.writeAsync(outputsDir + newFilename);
   return newFilename;
}

module.exports = textOverlay;