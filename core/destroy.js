const memes = [
    'https://c.tenor.com/5mtypTsQRgoAAAAd/anime-destroyed.gif',
    'https://c.tenor.com/Ds187JeCgckAAAAC/animehit-fugirl.gif',
    'https://c.tenor.com/twuGJPygsAMAAAAC/anime-love.gif',
    'http://i.imgur.com/KNpQxaS.gif',
    'https://i.imgur.com/fm49srQ.gif',
    'https://c.tenor.com/rVXByOZKidMAAAAd/anime-slap.gif',
    'https://c.tenor.com/AzIExqZBjNoAAAAC/anime-slap.gif',
    'https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif',
    'https://c.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif',
    'https://c.tenor.com/GBShVmDnx9kAAAAC/anime-slap.gif',
    'https://c.tenor.com/QLOZ4PqNz2sAAAAC/anime-slap.gif',
    'https://c.tenor.com/5eI0koENMAAAAAAC/anime-hit.gif',
    'https://c.tenor.com/JW1aqUKfSVcAAAAC/sao-embarassed.gif',
    'https://i.kym-cdn.com/photos/images/original/001/225/332/e83.gif',
    'https://c.tenor.com/UDo0WPttiRsAAAAd/bunny-girl-slap.gif',
    'https://i.kym-cdn.com/photos/images/original/000/965/466/bb1.gif',
    'https://c.tenor.com/iDdGxlZZfGoAAAAC/powerful-head-slap.gif',
    'https://i.imgur.com/o2SJYUS.gif',
    'https://c.tenor.com/Lc7C5mLIVIQAAAAC/anime-slap.gif',
    'https://cdn.quotesgram.com/img/34/51/819189293-slap.gif',
    'https://i.pinimg.com/originals/a0/dc/ce/a0dcce4e6eda2eba39d9f1fca82d32b6.gif',
    'https://c.tenor.com/1tk5BKEdCzcAAAAC/fumoffu-full-metal-panic.gif',
    'https://c.tenor.com/ZTozcByNaYMAAAAC/slap-butts-anime.gif',
    'https://c.tenor.com/b_4ERajyrPEAAAAC/slap-butts-anime.gif',
    'https://c.tenor.com/vLUU7ton9eoAAAAC/slap-butts-anime.gif',
    'https://c.tenor.com/WcYvM-SqPkoAAAAC/baka-slap.gif',
    'https://i.pinimg.com/originals/2a/a9/96/2aa996a717215d90e66c628832982fe5.gif'
]

const captions = [
    '**@** Destroyed **$**... What A Shame!',
    '**$** Was Destroyed, Someone Call **911**!',
    'Destruction Requested, **$** Accepted!',
    '**$**, How Many Fingers Are These: 🖕?',
    '**$**, First Pickup Your Dick From the Ground before anyone else does...',
    '**@**, Why Did You Destroy **$**? Don\'t You Know **Small Dick** Lives Matter?'
]

function getDestroyMeme () {
    return memes[Math.floor(Math.random() * memes.length)]
}

function getDestroyCaption () {
    return captions[Math.floor(Math.random() * captions.length)]
}


module.exports.getDestroyMeme = getDestroyMeme
module.exports.getDestroyCaption = getDestroyCaption