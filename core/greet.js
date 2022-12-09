const memes = [
  "https://i.imgur.com/9jcVOw9.gif",
  "https://data.whicdn.com/images/211700299/original.gif",
  "https://c.tenor.com/OoQlWsxH2SEAAAAC/hi-anime-hello.gif",
  "https://gifimage.net/wp-content/uploads/2017/09/anime-hello-gif-8.gif",
  "https://media.giphy.com/media/S5L3aOgVqbzhK/giphy.gif",
  "https://pa1.narvii.com/6299/457faeaed3eb7f65ca9a1cf037c45a6c6e399c1b_hq.gif",
  "https://i.pinimg.com/originals/ae/40/60/ae40603eddb6e4bb1ea56cc6de7d0f6e.gif",
  "https://pa1.narvii.com/6726/6d70658651b3a80101fced933e1fda29482b5bc8_hq.gif",
  "https://us.v-cdn.net/6030983/uploads/ETG19XGLTX99/zgn47gc.gif",
  "https://i.kym-cdn.com/photos/images/original/001/402/477/2ec.gif",
  "http://pa1.narvii.com/5632/c5612569563abae86b811071616e4c07f5b3aa18_hq.gif",
  "https://64.media.tumblr.com/3598defd377c9018af411cdd3c5a5b8f/7c5f92fcadca4be2-9e/s540x810/b6526ed49e3370e41a3428b3b7690b674fd8664e.gif",
  "https://qph.cf2.quoracdn.net/main-qimg-bb3c7292d3c2e75ba4b51ec15bb9bf3b",
  "https://media3.giphy.com/media/KTG2uX8CHJdIs/giphy.gif",
  "https://i.gifer.com/84OO.gif",
];

const messages = [
  "%u Greets %t! Hey!!",
  "%u Waved At %t!! Sup!",
  "%u Says Hi To %t!",
  "%u Waves At %t!! Hello There!",
  "%u Greeted %t!!",
];

function getGreet() {
  return memes[Math.floor(Math.random() * memes.length)];
}

function getMessage(user, target) {
  return messages[Math.floor(Math.random() * messages.length)]
    .replaceAll("%u", user)
    .replaceAll("%t", target);
}

module.exports = { getGreet, getMessage };
