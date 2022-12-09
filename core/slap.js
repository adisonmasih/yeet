const memes = [
  "https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif",
  "https://c.tenor.com/rVXByOZKidMAAAAd/anime-slap.gif",
  "https://c.tenor.com/OuYAPinRFYgAAAAC/anime-slap.gif",
  "https://64.media.tumblr.com/eafb3682db3dc1c8e316581359173687/tumblr_pdmeulC3Nm1rcufwuo1_540.gif",
  "https://i.pinimg.com/originals/fe/39/cf/fe39cfc3be04e3cbd7ffdcabb2e1837b.gif",
  "https://c.tenor.com/CvBTA0GyrogAAAAC/anime-slap.gif",
  "https://c.tenor.com/nBaCVW8855oAAAAC/anime-slap.gif",
  "https://thumbs.gfycat.com/TerribleLightBagworm-max-1mb.gif",
  "https://image.myanimelist.net/ui/BQM6jEZ-UJLgGUuvrNkYUHEZ_33p1we3TqZWmyZ6XW6iZ0m7dzGNimq8VUNzJkvR6yYwbx8kQMqR2_6m-cFJwA",
  "https://i.pinimg.com/originals/fb/17/a2/fb17a25b86d80e55ceb5153f08e79385.gif",
  "https://pa1.narvii.com/6807/ac91cef2e5ae98f598665193f37bba223301d75c_hq.gif",
  "https://c.tenor.com/AzIExqZBjNoAAAAC/anime-slap.gif",
];

const messages = [
  "%u Slapped %t! Deserved It!!",
  "%u Slapped %t!! WTF!",
  "%u Slapped %t Hard!",
  "%u Slapped %t!! It Hit Hard.",
  "%u Slapped %t!! Oh My!!",
];

function getSlap() {
  return memes[Math.floor(Math.random() * memes.length)];
}

function getMessage(user, target) {
  return messages[Math.floor(Math.random() * messages.length)]
    .replaceAll("%u", user)
    .replaceAll("%t", target);
}

module.exports = { getSlap, getMessage };
