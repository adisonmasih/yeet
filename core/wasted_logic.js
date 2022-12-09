const memes = [
    'https://c.tenor.com/hDFU7nFDFhcAAAAC/wasted-anime.gif',
    'https://c.tenor.com/hyt3ugFASW8AAAAd/anime-wasted.gif',
    'https://c.tenor.com/M17-O96DXfMAAAAd/anime-wasted.gif',
    'https://i.kym-cdn.com/photos/images/newsfeed/001/208/163/5e8.gif',
    'https://i.kym-cdn.com/photos/images/original/000/878/461/075.gif',
    'https://c.tenor.com/B1Oz37scDncAAAAC/pokemon-wasted.gif',
    'https://giffiles.alphacoders.com/128/128132.gif',
    'https://c.tenor.com/I_msiNVliZ4AAAAC/wasted-haikyuu.gif',
    'https://i.imgur.com/UYxek8t.gif',
    'https://i.gifer.com/KrBk.gif',
    'https://i.imgur.com/klX42HZ.gif',
    'https://www.pbh2.com/wordpress/wp-content/uploads/2014/12/wasted22.gif',
    'https://i.pinimg.com/originals/07/78/3b/07783be78b74523c55d7a57a4b9342f3.gif',
    'https://i.imgur.com/8RFZOHW.gif',
    'https://thumbs.gfycat.com/SerpentineDeepClingfish-size_restricted.gif',
    'https://i.gifer.com/HvVK.gif',
    'https://c.tenor.com/Ly8IOa3VNCEAAAAd/wasted-kids.gif',
    'https://i.gifer.com/WRLR.gif',
    'https://i.gifer.com/QkCe.gif',
    'https://i.gifer.com/QZ70.gif',
    'https://i.gifer.com/XR1l.gif'
]

function getWasted () {
    return memes[Math.floor(Math.random() * memes.length)];
}

module.exports = getWasted