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
  {
    name: "Arson",
    rewards: [
      "You successfully set fire to a warehouse and stole %n worth of goods!",
      "You burnt down your ex's house and found %n hidden under the floorboards!",
      "Your arson attempt caused chaos in the city, but you managed to escape with %n!",
      "You set fire to a forest and stumbled upon %n buried in the ashes!",
      "Your arson plan backfired, but you still salvaged %n from the wreckage!",
    ],
    fails: [
      "Your matchstick broke as you tried to light the fire, and you were caught by the security guard!",
      "You accidentally set fire to your own car and ended up with burns instead of cash!",
      "Your arson attempt was foiled by a sudden rainstorm, and you ended up empty-handed!",
      "You got trapped in the building you set on fire and had to be rescued by the firefighters!",
      "Your arson attempt was mistaken for a protest, and you were arrested before you could grab anything!",
    ],
  },
  {
    name: "Counterfeiting",
    rewards: [
      "You successfully forged %n worth of currency and managed to spend it without getting caught!",
      "Your counterfeit designer bags sold like hotcakes, earning you %n in profits!",
      "You printed fake concert tickets and made %n from selling them to desperate fans!",
      "Your counterfeit paintings fooled art collectors, earning you %n before they realized the scam!",
      "You manufactured fake prescription drugs and sold them for %n to unsuspecting buyers!",
    ],
    fails: [
      "Your counterfeit money was immediately detected by the bank, and you were arrested!",
      "You accidentally misspelled a famous brand name on your counterfeit products, blowing your cover!",
      "Your counterfeit IDs were so poorly made that they fell apart in the hands of the bouncers!",
      "You got scammed by a supplier who sold you faulty equipment for making counterfeit goods!",
      "Your counterfeit paintings were exposed as fakes by an art expert, ruining your reputation!",
    ],
  },
  {
    name: "Kidnapping",
    rewards: [
      "You successfully kidnapped a millionaire's child and received %n as ransom!",
      "Your kidnapping scheme went smoothly, and you earned %n from the terrified parents!",
      "You kidnapped a celebrity's pet and got %n in reward money for its safe return!",
      "Your ransom demand was met, and you made %n from releasing the kidnapped individual unharmed!",
      "You kidnapped a politician's relative and received %n in hush money to keep it quiet!",
    ],
    fails: [
      "Your kidnapping attempt failed when the intended victim fought back and escaped!",
      "You accidentally kidnapped the wrong person and had to release them without any ransom!",
      "Your kidnapping plan was thwarted by the police before you could make any demands!",
      "The kidnapped individual turned out to be an undercover cop, and you were arrested!",
      "Your ransom note was intercepted by the authorities, leading to your capture before you could execute the plan!",
    ],
  },
  {
    name: "Identity Theft",
    rewards: [
      "You successfully stole someone's identity and used it to empty their bank account, gaining %n!",
      "Your identity theft operation went undetected, allowing you to rack up %n in fraudulent charges!",
      "You impersonated a wealthy individual and secured a loan for %n in their name!",
      "Your stolen identity gained access to valuable assets, resulting in %n in ill-gotten gains!",
      "You hacked into a celebrity's social media account and sold access for %n to the highest bidder!",
    ],
    fails: [
      "Your attempt to steal someone's identity was foiled by two-factor authentication!",
      "You mistakenly used your own address for fraudulent purchases, leading to your arrest!",
      "Your fake ID was easily recognized as a forgery, and you were denied entry to the club!",
      "The person whose identity you stole turned out to be bankrupt, leaving you with nothing to gain!",
      "Your attempt to impersonate a high-profile individual was quickly exposed by the media, ruining your reputation!",
    ],
  },
  {
    name: "Extortion",
    rewards: [
      "You successfully extorted %n from a local business by threatening to reveal their illegal activities!",
      "Your extortion scheme intimidated a wealthy individual into paying %n for their safety!",
      "You blackmailed a politician with incriminating evidence and received %n to keep it secret!",
      "Your threat to release compromising photos earned you %n from the desperate victim!",
      "You extorted %n from a rival gang by threatening to reveal their criminal operations to the authorities!",
    ],
    fails: [
      "Your attempt to extort money from a corporation backfired when they reported you to the police!",
      "You mistakenly targeted an undercover cop for extortion and were arrested on the spot!",
      "Your extortion letter was intercepted by the intended victim's security team, leading to your capture!",
      "The person you tried to blackmail turned out to be broke, leaving you empty-handed!",
      "Your extortion attempt was met with laughter and ridicule, humiliating you in front of your peers!",
    ],
  },
  {
    name: "Smuggling",
    rewards: [
      "You successfully smuggled %n worth of contraband across the border without detection!",
      "Your smuggling operation delivered %n in illegal goods to eager buyers!",
      "You hid valuable artifacts in shipments of mundane items, netting %n in profits!",
      "Your drug smuggling ring operated smoothly, bringing in %n in revenue!",
      "You smuggled exotic animals past customs and sold them for %n on the black market!",
    ],
    fails: [
      "Your attempt to smuggle illegal goods was thwarted by border patrol, resulting in your arrest!",
      "You accidentally ingested the contraband you were smuggling and had to be rushed to the hospital!",
      "Customs officers discovered the hidden compartment in your vehicle, exposing your smuggling operation!",
      "Your attempt to smuggle weapons was intercepted by authorities, leading to a lengthy prison sentence!",
      "The cargo ship carrying your smuggled goods sank in a storm, leaving you with nothing to show for your efforts!",
    ],
  },
  {
    name: "Bribery",
    rewards: [
      "You bribed a government official and got %n in exchange for a favorable decision!",
      "Your bribe to a judge ensured that your case was dismissed, saving you %n in fines!",
      "You paid off a police officer to overlook your illegal activities, preserving %n in profits!",
      "Your bribe to a corporate executive secured you %n worth of lucrative contracts!",
      "You bribed a border guard to allow illegal immigrants entry, earning %n for each person!",
    ],
    fails: [
      "Your attempt to bribe a public official was reported, resulting in your arrest for corruption!",
      "You mistakenly offered a bribe to an undercover agent, leading to your immediate capture!",
      "The person you tried to bribe was insulted by the offer and reported you to the authorities!",
      "Your bribe attempt was intercepted by surveillance cameras, providing irrefutable evidence of your crime!",
      "The official you tried to bribe was already under investigation, and your offer implicated you in their corruption scandal!",
    ],
  },
  {
    name: "Embezzlement",
    rewards: [
      "You embezzled %n from your employer's funds and invested it for personal gain!",
      "Your embezzlement scheme went undetected, allowing you to siphon off %n over several years!",
      "You manipulated accounting records to hide your embezzlement of %n from the company's coffers!",
      "Your embezzlement of %n from a charitable organization went unnoticed due to lax oversight!",
      "You diverted %n from a government grant into your personal account without raising suspicion!",
    ],
    fails: [
      "Your attempt to embezzle funds was discovered during an audit, leading to your immediate termination!",
      "You accidentally transferred the embezzled money into the wrong account, leaving a trail that exposed your crime!",
      "Your lavish spending drew attention to your embezzlement scheme, prompting an investigation!",
      "The charity you stole from went bankrupt due to your embezzlement, leaving you with nothing to show for your crime!",
      "Your embezzlement attempt was thwarted by a vigilant coworker who reported your suspicious behavior to management!",
    ],
  },
  {
    name: "Blackmail",
    rewards: [
      "You successfully blackmailed a wealthy individual and received %n to keep their secret!",
      "Your threat to release compromising photos earned you %n from the desperate victim!",
      "You used incriminating evidence to blackmail a politician into paying %n for their silence!",
      "Your knowledge of a celebrity's scandalous affair netted you %n in hush money to keep it quiet!",
      "You blackmailed a corporate executive with sensitive information, securing %n for your silence!",
    ],
    fails: [
      "Your attempt to blackmail someone was met with defiance, and they reported you to the authorities!",
      "You mistakenly targeted an undercover cop for blackmail, resulting in your immediate arrest!",
      "The person you tried to blackmail turned out to be destitute, leaving you with no leverage to exploit!",
      "Your blackmail letter was intercepted by the intended victim's security team, leading to your capture!",
      "The information you tried to use for blackmail turned out to be false, exposing you as a fraud!",
    ],
  },
  {
    name: "Forgery",
    rewards: [
      "You successfully forged %n worth of documents and used them to secure a loan!",
      "Your forgery of a famous painting fooled art collectors, earning you %n in ill-gotten gains!",
      "You forged your academic transcripts and landed a high-paying job, thanks to your fake credentials!",
      "Your fake IDs allowed you to gain access to exclusive events, where you profited %n from selling counterfeit goods!",
      "You fabricated evidence in a legal case and received %n for your testimony!",
    ],
    fails: [
      "Your attempt to forge documents was uncovered during verification, leading to your immediate dismissal!",
      "You accidentally misspelled a crucial detail in your forgery, exposing it as a fake!",
      "Your fake IDs were easily recognized as counterfeits by bouncers, preventing you from entering the club!",
      "The person you tried to deceive with your forgery turned out to be an expert in the field, exposing your fraud!",
      "Your forged documents were flagged by authorities, leading to a thorough investigation of your activities!",
    ],
  },
  {
    name: "Assault",
    rewards: [
      "You successfully assaulted someone and stole %n worth of valuables from them!",
      "Your assault on a rival gang member earned you %n in respect from your peers!",
      "You attacked a wealthy individual and demanded %n as ransom for their safety!",
      "Your assault on a security guard allowed you to break into a high-security facility and steal %n!",
      "You beat up a debtor and confiscated %n in cash as repayment for their debt!",
    ],
    fails: [
      "Your assault attempt backfired when the intended victim fought back and overpowered you!",
      "You accidentally attacked an innocent bystander, drawing attention to your criminal activities!",
      "The person you assaulted turned out to be an undercover cop, resulting in your immediate arrest!",
      "Your assault on a well-connected individual prompted retaliation from their associates, putting you in danger!",
      "You underestimated your opponent and suffered injuries yourself during the assault!",
    ],
  },
  {
    name: "Vandalism",
    rewards: [
      "You successfully vandalized a wealthy neighborhood and caused %n worth of property damage!",
      "Your graffiti tag became infamous overnight, earning you %n from admirers who wanted your art!",
      "You smashed the windows of a rival gang's headquarters and stole %n worth of equipment!",
      "Your vandalism of a political billboard went viral, earning you %n in donations from supporters!",
      "You defaced a historical monument and received %n from anarchists who admired your rebellion!",
    ],
    fails: [
      "Your attempt at vandalism was interrupted by police officers, who apprehended you at the scene!",
      "You accidentally vandalized the property of a powerful crime syndicate, drawing their ire and retaliation!",
      "Your graffiti was mistaken for a rival gang's territory marking, leading to a violent confrontation!",
      "The artwork you tried to destroy turned out to be a priceless masterpiece, resulting in public outcry!",
      "Your vandalism attempt was captured on security cameras, providing evidence for your arrest!",
    ],
  },
  {
    name: "Harassment",
    rewards: [
      "You successfully harassed a wealthy individual and received %n to stop your torment!",
      "Your campaign of harassment against a rival gang member earned you %n in respect from your peers!",
      "You intimidated a corporate executive and extorted %n as protection money for their safety!",
      "Your relentless harassment of a celebrity led to %n in hush money to keep it quiet!",
      "You bullied a politician into paying %n to stop your slanderous accusations!",
    ],
    fails: [
      "Your harassment attempt backfired when the intended victim sought legal protection and had you restrained!",
      "You accidentally targeted an innocent bystander, drawing attention to your criminal activities!",
      "The person you harassed turned out to be an undercover cop, resulting in your immediate arrest!",
      "Your campaign of harassment prompted retaliation from the victim's associates, putting you in danger!",
      "You underestimated your opponent and suffered consequences yourself during the harassment!",
    ],
  },
  {
    name: "Tax Evasion",
    rewards: [
      "You successfully evaded %n in taxes by hiding your income in offshore accounts!",
      "Your tax evasion scheme went undetected, allowing you to avoid paying %n for years!",
      "You falsified business expenses to reduce your taxable income, saving %n in taxes!",
      "Your manipulation of financial records fooled auditors, enabling you to dodge %n in taxes!",
      "You bribed tax officials to overlook your underreported income, saving %n in taxes!",
    ],
    fails: [
      "Your attempt to evade taxes was uncovered during an audit, leading to hefty fines and penalties!",
      "You accidentally filed false information on your tax return, triggering an investigation into your finances!",
      "Your extravagant lifestyle drew suspicion from tax authorities, prompting an audit of your financial records!",
      "The accountant you hired to handle your taxes turned out to be an informant, leading to your arrest!",
      "Your attempt to bribe tax officials was reported, resulting in criminal charges for bribery and tax evasion!",
    ],
  },
  {
    name: "Insider Trading",
    rewards: [
      "You successfully engaged in insider trading and profited %n from buying and selling stocks!",
      "Your access to confidential information allowed you to make %n in profits by trading ahead of market movements!",
      "You bribed an insider for tips on upcoming mergers, earning %n from trading on the privileged information!",
      "Your manipulation of corporate announcements netted you %n in gains from stock price fluctuations!",
      "You hacked into a financial institution's database and stole insider information, resulting in %n in profits!",
    ],
    fails: [
      "Your insider trading activities were flagged by regulatory authorities, leading to an investigation and penalties!",
      "You mistakenly traded on false insider information, resulting in losses and suspicion from investors!",
      "Your suspicious trading patterns drew attention from market surveillance, triggering an inquiry into your activities!",
      "The insider you bribed turned out to be an informant, leading to your arrest for securities fraud!",
      "Your attempt to hack into a financial institution's database was traced back to you, resulting in criminal charges!",
    ],
  },
  {
    name: "Counterfeiting",
    rewards: [
      "Your sophisticated counterfeit operation produced %n in fake currency that was successfully laundered and circulated!",
      "You manufactured high-quality counterfeit goods and sold them for %n, turning a hefty profit!",
      "Your fake identification documents were indistinguishable from genuine ones, allowing you to sell them for %n to criminal clients!",
      "You replicated brand-name products with precision, earning %n from unsuspecting consumers who purchased your knockoff merchandise!",
      "Your forgery skills enabled you to create %n worth of counterfeit artwork that was sold to collectors as authentic masterpieces!",
    ],
    fails: [
      "Your counterfeit currency was detected by bank tellers, who alerted authorities and initiated an investigation into your operation!",
      "You were betrayed by an accomplice who turned informant, leading to a police raid on your counterfeit workshop!",
      "The fake identification documents you sold were flagged by border control, resulting in the detention and questioning of your clients!",
      "Your counterfeit products were exposed as fakes by vigilant consumers, leading to lawsuits and financial losses!",
      "Law enforcement agencies launched a crackdown on counterfeit goods, dismantling your operation and seizing your equipment!",
    ],
  },
  {
    name: "Money Laundering",
    rewards: [
      "Your successful money laundering scheme processed %n in illicit funds, making them appear legitimate and usable!",
      "You established a complex network of shell companies to launder %n in dirty money through legitimate channels!",
      "Your investment in real estate allowed you to launder %n by purchasing properties and selling them at inflated prices!",
      "You utilized cryptocurrency exchanges to convert %n in illegal proceeds into untraceable digital assets!",
      "Your front businesses provided a cover for laundering %n in criminal profits without raising suspicion!",
    ],
    fails: [
      "Your attempt to launder money attracted the attention of financial regulators, who froze your assets and launched an investigation into your financial activities!",
      "You unwittingly entered into a money laundering scheme orchestrated by a criminal syndicate, resulting in your implication in their illicit operations!",
      "The transactions used to launder money were flagged by banks as suspicious, triggering compliance checks and scrutiny of your financial history!",
      "Your efforts to launder money through legitimate businesses were undermined by poor accounting practices, leaving a paper trail that led directly to your doorstep!",
      "Law enforcement agencies uncovered your money laundering activities through undercover investigations and surveillance, leading to your arrest and prosecution!",
    ],
  },
  {
    name: "Smash and Grab",
    rewards: [
      "Your swift smash and grab at a luxury jewelry store netted %n in stolen merchandise before police could respond!",
      "You orchestrated a distraction to divert attention away from your smash and grab, allowing you to escape with %n in stolen goods!",
      "Your targeted smash and grab at a high-end electronics store resulted in %n worth of stolen gadgets that were quickly fenced for cash!",
      "You utilized a stolen vehicle to crash through the storefront, enabling you to grab %n in valuables before fleeing the scene!",
      "Your team executed a coordinated smash and grab at multiple retail locations, making off with %n in stolen merchandise during a single spree!",
    ],
    fails: [
      "Your attempted smash and grab was thwarted by reinforced security measures, preventing you from gaining access to the targeted store!",
      "You underestimated the response time of law enforcement, and were apprehended by police before you could escape with the stolen goods!",
      "The stolen vehicle you used in the smash and grab was traced back to you, leading to your arrest for grand theft auto and burglary!",
      "Your hasty escape from the scene of the crime resulted in the loss of the stolen goods, which were recovered by law enforcement during pursuit!",
      "The valuables you stole during the smash and grab turned out to be counterfeit, leaving you empty-handed and pursued by angry store owners!",
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
              `**${amount}** <:yeet_coin:1239568630337900715>`
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
