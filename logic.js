const jsdom = require("jsdom");

const { JSDOM } = jsdom;

var n = new Array(1000)
n[0] = "The sky";
n[1] = "Everything and more";
n[2] = "The clear star that is yesterday";
n[3] = "Tomorrow";
n[4] = "An old apple";
n[5] = "Camouflage paint";
n[6] = "A sound you heard";
n[7] = "A setback of the heart";
n[8] = "The body of mind";
n[9] = "A classical composition";
n[10] = "Another day";
n[11] = "Chair number eleven";
n[12] = "Nihilism";
n[13] = "Tranquility";
n[14] = "Wondrous awe";
n[15] = "That memory we used to share";
n[16] = "Nothing of importance";
n[17] = "Clear water";
n[18] = "Gasoline";
n[19] = "Sixty-four";
n[20] = "Nothingness";
n[21] = "The flow of quizzes";
n[22] = "An enigma";
n[23] = "A wave loudly clashing against a long shoreline";
n[24] = "Stupidity";
n[25] = "Love";
n[26] = "Sex";
n[27] = "An idea";
n[28] = "The last sentence you saw";
n[29] = "The person you were before";
n[30] = "A flailing monkey";
n[31] = "Organisational culture";
n[32] = "Trickery";
n[33] = "A caring mother";
n[34] = "A sickingly prodigous profile";
n[35] = "A fly";
n[36] = "Two-finger John";
n[37] = "Sevenworm";
n[38] = "Pinocchio";
n[39] = "Lucky number slevin";
n[40] = "A shooting star";
n[41] = "Whiskey on the table";
n[42] = "A cranky old lady";
n[43] = "Stew and rum";
n[44] = "Spam";
n[45] = "Lonely Henry";
n[46] = "Style";
n[47] = "Fashion";
n[48] = "A principal idea";
n[49] = "Too long a stick";
n[50] = "A glittering gem";
n[51] = "That way";
n[52] = "Significant understanding";
n[53] = "Passion or serendipity";
n[54] = "A late night";
n[55] = "A stumbling first step";
n[56] = "That stolen figurine";
n[57] = "A token of gratitude";
n[58] = "A small mercy";
n[59] = "Utter nonsense";
n[60] = "Colorful clay";
n[61] = "Insignificance";
n[62] = "The light at the end of the tunnel";
n[63] = "The other side";
n[64] = "Abstraction";
n[65] = "Rock music";
n[66] = "A passionate evening";
n[67] = "A great silence";
n[68] = "A river a thousand paces wide";
n[69] = "The legend of the raven's roar";
n[70] = "Enqoyism"
var v = new Array(1000)
v[0] = "is like a painted flower; it never wilts.";
v[1] = "runs through everything.";
v[2] = "is ever present.";
v[3] = "lies ahead, what with the future yet to come.";
v[4] = "approaches at high velocity!";
v[5] = "is nonsensical, much like me.";
v[6] = "likes to take a walk in the park.";
v[7] = "is still not very coherent.";
v[8] = "loves to love.";
v[9] = "would die for a grapefruit!";
v[10] = "sickens me.";
v[11] = "has your skin crawling.";
v[12] = "makes people shiver.";
v[13] = "is always a pleasure.";
v[14] = "could please even the most demanding follower of Freud.";
v[15] = "slips on a banana peel.";
v[16] = "is nothing at all?";
v[17] = "doesn't like paying taxes.";
v[18] = "would kindly inquire something about you.";
v[19] = "is not yet ready to die.";
v[20] = "is omni-present, much like candy.";
v[21] = "is good for you.";
v[22] = "does not make any sense.";
v[23] = "gambles with lives, happiness, and even destiny itself!";
v[24] = "would scare any linguist away.";
v[25] = "sees the sun.";
v[26] = "is running away.";
v[27] = "jumps both ways.";
v[28] = "can get both high and low.";
v[29] = "tests the thesis that your theorem would unleash.";
v[30] = "comes asking for bread.";
v[31] = "is interdependant on the relatedness of motivation, subcultures, and management.";
v[32] = "says hello.";
v[33] = "tenderly sees to her child.";
v[34] = "wants to go to hell.";
v[35] = "is often pregnant.";
v[36] = "is often one floor above you.";
v[37] = "likes to have a shower in the morning.";
v[38] = "wants to set things right.";
v[39] = "tells the tale of towers.";
v[40] = "stole the goods.";
v[41] = "woke the prime minister.";
v[42] = "shot the sheriff.";
v[43] = "lay down on the riverbed.";
v[44] = "asked you a question?";
v[45] = "sat down once more.";
v[46] = "shoots pineapples with a machinegun.";
v[47] = "will take you to places you never expected not to visit!";
v[48] = "revels in authority.";
v[49] = "stands upon somebody else's legs.";
v[50] = "visits Japan in the winter.";
v[51] = "says goodbye to the shooter.";
v[52] = "welcomes spring!";
v[53] = "loves a good joke!";
v[54] = "is a storyteller without equal.";
v[55] = "rains heavily.";
v[56] = "is like a summer breeze.";
v[57] = "is f***ing cosmopolitan, having a trained assassin stay overnight, letting heartbreaking lies roll over us like a summer breeze.";
v[58] = "wanted the TRUTH!";
v[59] = "set a treehouse on fire.";
v[60] = "bathes in sunlight.";
v[61] = "has its world rocked by trees (or rocks).";
v[62] = "ever stuns the onlooker.";
v[63] = "brings both pleasure and pain.";
v[64] = "takes the world for granted.";
v[65] = "is not enough.";
v[66] = "was always the second best.";
v[67] = "is not all that great.";
v[68] = "shakes beliefs widely held.";
v[69] = "always strikes for the heart.";
v[70] = "is belief in the interrelatedness of all things."
var i1 = 0;
var i2 = 0;
var nx = 71;
var vx = 71;

async function generate(what = 0) {
  if (what == 1)
    i1 = get_random(nx);
  else if (what == 2)
    i2 = get_random(vx);
  else {
    i1 = get_random(nx);
    i2 = get_random(vx);
  }
  return n[i1] + " " + v[i2];
}

function get_random(int) {
  var ranNum = Math.floor(Math.random() * int);
  return ranNum;
}

async function getRandomSentences() {
//   if(fetch) {
//       let final = []
//   let res = await fetch("https://generatorfun.com/code/model/generatorcontent.php?recordtable=generator&recordkey=650&gen=Y&itemnumber=");
//   let html = await res.text()
//   let doc = new JSDOM(html)
//   let gen = doc.window.document.body.querySelectorAll('#gencont div')
//   for (x of gen) {
//     final.push(x.innerHTML.replaceAll('<p>', '').replaceAll('</p>', ''))
//   } 
  
//   return final[0] ?? generate()
// } else {
//       return generate();
//   }
    return generate();
}


module.exports = (Math.random() < 0.5 ? generate : getRandomSentences);