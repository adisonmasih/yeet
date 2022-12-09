const crimeMessages = [
  {
    name: "Property Crime",
    rewards: [
      "Oh My! You Destructed A Rich Man's House And Hid Underground! You Also Stole %n From His House!",
      "Shit.. You Barely Managed To Get Away When The Building Exploded.. Still You Got %n...",
      "You Made Your Dad's Sign The Property Papers.. You Sold 'em And Got %n!",
      "dayum. You Broke Into someone's house but they were dead. You Stole %n",
      "You Bribed The Watchman & Stole %n",
    ],
    fails: [
      "You tried to unlock the padlock but the watchman caught you...",
      "You Broke into a house but burped loud waking everyone",
      "You were running away with the money, but you saw Jesus's photo. you were touched.",
      "you tried bribing the watchman, but he kicked ya ass",
      "you fought the guard dog but lost your dick in the fight",
    ],
  },
  {
    name: "Trespassing",
    rewards: [
      "You walked straight into someone nerds's yard and found %n. He A Millionaire.",
      "You walked down someone's house who were fighting. you resolved their fight and got %n",
      "you ran into a hot dog man and he gifted you his balls worth %n",
      "you walked into an old farm and found treasure worth %n",
      "you walked on to your maths teacher kissing your P.T Sir, they give you %n to stay silent!",
    ],
    fails: [
      "you walked on a couple kissing and got slapped.",
      "you walked into an old house and were hunted down by a child's ghost",
      "you walked onto a dead man's body and the police arrested you.",
      "you tried to walk into somone's yard but got your leg fractured.",
      "you tried to commit trespassing but realised you have no existance.",
    ],
  },
  {
    name: "Treason",
    rewards: [
      "You Helped Your Enemies Blow Up Your Country. They Rewarded You With %n",
      "Your Enemies Died In The Fight, But you stole their resources and sold 'em for %n",
      "you agreed to help your enemies but backstabbed them, your country gave you %n",
      "you made your enemies back out the plan, your country gifted you %n",
      "you sued your government for %n and won the case",
    ],
    fails: [
      "You failed to host an insurrection, everyone is laughing at you.",
      "your enemies backstabbed you. everyone is composing memes about you now.",
      "your enemies pranked you and were jailed",
      "you helped your enemies, but they didn't pay you.",
      "you approached your enemies but they rejected you.",
    ],
  },
  {
    name: "Shoplifting",
    rewards: [
      "You Stole Some Items worth %n From The Shop And no body noticed you!",
      "the shopkeeper saw you stealing, but you managed to run out with %n!",
      "you thought the shopkeeper saw you steal, but turns out he was blind & you got away with %n!",
      "turns out the shop is owned by [MrBeast](https://www.youtube.com/user/MrBeast6000)\nand he let you steal everything worth %n!",
      "your leg got fractured. but you still managed to steal %n",
    ],
    fails: [
      "turns out you stole from your uncle's shop and he beat you up!",
      "you ignored the CCTV Cameras and were caught!",
      "turns out you stole from a cop's shop. you are now arrested.",
      "turns out the shop was a trap by the FBI. bad luck.",
      "you thought that you commited the crime, but turns out you were in a simulation.",
    ],
  },
  {
    name: "Peeing on the wall",
    rewards: [
      "you made an exotic art while peeing and **John Currin** gave you %n!",
      "turns out your pee can cure cancer. now everybody is drinking it and you are charging %n per drink",
      "your pee turned out to be blue & the scientists gave you %n to test it",
      "you were peeing on the wall but accidently a girl came in the way.. she gave you %n to do it again",
      "your pee smelt so bad that the aliens decided to return to their home. your country gifted you %n",
    ],
    fails: [
      "you were peeing but a cop caught you!",
      "you were peeing but some girls complained to the police! you are now arrested!",
      "your pee smelled so bad that you fainted!",
      "a girl decided to drink your pee directly from your penis,\nbut the neighbors took it as a sexual assault!",
      "you wrote your name on the wall through your pee..\nbut the police caught you with that info!",
    ],
  },
  {
    name: "Hacking",
    rewards: [
      "you hacked into your dad's account and stole %n!",
      "you hacked your exam grades and the school gave you a scholarship worth %n! Big Brain 🧠",
      "you hacked NASA and they gave you %n for informing the breach to them!",
      "you hacked your sister's phone and showed her texts to your parents! now you got her %n montly allowance!",
      "you hacked **Elon Musk's** Bank account and stole %n!",
    ],
    fails: [
      "You hacked into your own router and found out the ISP does not actually care about you.",
      "you tried hacking ISRO, but turns out Indians are way smarter!",
      "you hacked your own computer and injected a virus into it",
      "you tried hacking the bank's site, but you were caught!",
      "turns out the old man you tried to hack, hacked you back!",
      "You tried to hack someone, but turns out you don't know [Python](https://www.python.org/)",
      "you tried hacking, but turns out you don't know how to use [Linux](https://www.linux.org/)",
    ],
  },
  {
    name: "Cyber Bullying",
    rewards: [
      "you bullied a kid and he sent you %n to stop",
      "you bullied an IIT aspirant, and he sent you %n to stop",
      "you made someone depressed by bullying them, they sent you %n to stop!",
      "you somehow managed to bully a terrorist, and your country awarded you with %n!",
      "you bullied the devil and he became a good person. GOD blessed you with %n for that!",
    ],
    fails: [
      "you tried bullying a kid but he roasted you back",
      "you bullied someone but they didn't give a fuck about it",
      "turns out you were bullying your own dad. you are now homeless.",
      "turns out you were bullying your teacher. i bet you will fail the exams.",
      "you tried bullying an old man, but he was already dead.",
    ],
  },
  {
    name: "Fraud",
    rewards: [
      "You lied to an old lady over the phone and got %n",
      "you launched a fake business and ended up collecting %n!",
      "you sold your book-worm classmate a fake test paper for %n!",
      "you sold a toothpaste biscuit to a kid for %n!",
      "you sold away your malfunctioned brain for %n!",
    ],
    fails: [
      "you tried to scam a woman, but turns out she scammed you back!",
      "you tried selling away your malfunctioned brain, but the buyer\nchecked it before buying. you are now arrested!",
      "you tried selling a fake gold ring, but people called cops on you!",
      "you tried selling your friend a used condom, but his girl caught you and beat you up!",
      "you tried scamming your teacher with fake money for good grades, but she told your parents!",
    ],
  },
];

const backOutMessages = [
  "I Guess You Are Too Scared...",
  "Come On Man! You Don't Have The Balls!",
  "Wouldn't Have Waited For You fOrEvEr",
  "How Would You Get A Girl When You Can't Commit A _Simple_ Crime?",
];

let crimes = [];

class Crime {
  constructor({ name, rewards, fails }) {
    this.id = this.getWordInitials(name) + Math.floor(Math.random() * 100);
    this.name = name;
    this.rewards = rewards;
    this.fails = fails;
  }

  getWordInitials(str) {
    let result = [];

    str
      .split(" ")
      .map((word) => (word.charAt(0) != "" ? result.push(word.charAt(0)) : ""));

    return result.join("_").replaceAll(" ", "").toLowerCase();
  }

  commit() {
    const luck = Math.floor(Math.random() * 100);
    let amount = Math.floor(Math.random() * 5000);

    return {
      type: luck > 70 ? "reward" : "fail",
      message:
        luck > 70
          ? this.rewards
              .random()
              .replaceAll(
                "%n",
                `**${amount}** <:yeet_coin:1005622646903410738>`
              )
          : this.fails.random(),
      rewardAmount: amount,
    };
  }

  commitById(id) {
    return crimes?.filter((c) => c.id == id)?.[0]?.commit();
  }

  static getCrimes(n = 3) {
    return crimes.randomX(n);
  }

  static getBackOut() {
    return backOutMessages.random();
  }
}

crimeMessages.forEach((crime, _) => {
  crimes.push(new Crime(crime));
});

module.exports = {
  crimes,
  Crime,
};
