let riddles = [
  {
    question: `What is the best way to get a job in the world?`,
    answer: `Apply for a job`,
  },
  {
    question: `Why did Snap, Crackle, and Pop get scared?`,
    answer: `They heard there was a cereal killer on the loose.`,
  },
  {
    question: `What can go up a chimney down, but can’t go down a chimney up?`,
    answer: `An umbrella. If your umbrella is down, it can fit through a chimney, but if it’s up, it won’t fit!`,
  },
  {
    question: `How do you spell COW in thirteen letters?`,
    answer: `SEE O DOUBLE YOU.`,
  },
  {
    question: `Why is an island like the letter T?`,
    answer: `They’re both in the middle of water!`,
  },
  {
    question: `What has wheels and flies, but it is not an aircraft?`,
    answer: `A garbage truck.`,
  },
  {
    question: `What tastes better than it smells?`,
    answer: `Tongue`,
  },
  {
    question: `What do you call a bear without ears?`,
    answer: `a "B"`,
  },
  {
    question: `Who lives an exhausting life?`,
    answer: ` The exhaust.`,
  },
  {
    question: `What hard rock group has four dudes, but not one of them plays the guitar?`,
    answer: `Mount Rushmore.`,
  },
  {
    question: `Sometimes I am born in silence, Other times, no. I am unseen, But I make my presence known. In time, I fade without a trace. I harm no one, but I am unpopular with all. What am I?`,
    answer: `A fart`,
  },
  {
    question: `What do you get if you cross poison ivy with a four-leaf clover?`,
    answer: `A rash of good luck!`,
  },
  {
    question: `Why is Europe like a frying pan?`,
    answer: `Because it has Greece at the bottom.`,
  },
  {
    question: `What do you call a fly without wings?`,
    answer: `A walk`,
  },
  {
    question: `What word has five letters but sounds like it only has one?`,
    answer: `Queue`,
  },
  {
    question: `I am neither a guest nor a trespasser be, to this place I belong, it belongs also to me.`,
    answer: `Home`,
  },
  {
    question: `What is 3/7 chicken, 2/3 cat, and 2/4 goat?`,
    answer: `Chicago!`,
  },
  {
    question: `A pet shop owner had a parrot with a sign on its cage that said Parrot repeats everything it hears. Davey bought the parrot and for two weeks he spoke to it and it didn’t say a word. He returned the parrot but the shopkeeper said he never lied about the parrot. How can this be?`,
    answer: `The parrot was deaf.`,
  },
  {
    question: `Which part of a road do ghosts most love to travel?`,
    answer: `The dead end`,
  },
  {
    question: `Why can’t a pirate ever finish the alphabet?`,
    answer: `Because he always gets lost at sea!`,
  },
  {
    question: `What do Alexander The Great and Winnie The Pooh have in common?`,
    answer: `Same middle name.`,
  },
  {
    question: `Add me to myself and multiply by 4. Divide me by 8 and you will have me once more. What number am I?`,
    answer: `Any number`,
  },
  {
    question: `In a certain country ½ of 5 = 3. If the same proportion holds, what is the value of 1/3 of 10?`,
    answer: `4`,
  },
  {
    question: `If a zookeeper had 100 pairs of animals in her zoo, and two pairs of babies are born for each one of the original animals, then (sadly) 23 animals don’t survive, how many animals do you have left in total?`,
    answer: `977 animal (100 x 2 = 200; 200 + 800 = 1000; 1000 – 23 = 977)`,
  },
  {
    question: `There is a 3-digit number. The second digit is four times as big as the third digit, while the first digit is three less than the second digit. What is the number?`,
    answer: `141`,
  },
  {
    question: `Ram has 5 sons. Each of his sons has a sister. How many children does Ram have?`,
    answer: `Six. All of the sons have the same sister.`,
  },
  {
    question: `100 coins were dropped and got scattered inside a dark place. 90 of the coins fell with heads facing up and the remaining 10 coins fell with tails up. You are asked to sort the coins into 2 piles. Each pile should have the same count of tails-up coins. How is it possible?`,
    answer: `Make 2 piles, one with 90 coins and the other with 10 coins. Flip 10 coins on the pile of 90. The piles will have the same count of tails-up coins.`,
  },
  {
    question: `A merchant can place 8 large boxes or 10 small boxes into a carton for shipping. In one shipment, he sent a total of 96 boxes. If there are more large boxes than small boxes, how many cartons did he ship?`,
    answer: `11 cartons total`,
  },
  {
    question: `In an alien land far away, half of 10 is 6. If the same proportion holds true, then what is 1/6th of 30 in this alien land?`,
    answer: `6`,
  },
  {
    question: `What is half of two plus two?`,
    answer: `three`,
  },
  {
    question: `What do geometry teachers have decorating their floor?`,
    answer: `Area rugs!`,
  },
  {
    question: `You have 50 biscuits. How many times can you subtract 5 from 50 biscuits?`,
    answer: `Once only because after that it will not be 50 biscuits. As you subtract 5 biscuits it will be 45 and not 50 anymore.`,
  },
  {
    question: `I saw my math teacher with a piece of graph paper yesterday`,
    answer: `I think he must be plotting something.`,
  },
  {
    question: `The price of a duck is Rs. 9, a spider costs Rs. 36 and a bee was priced Rs. 27. By taking into account this information, what will be the price of a cat?`,
    answer: `Rs.18 (Rs. 4.50 per leg)`,
  },
  {
    question: `Suppose 1+9+8=1, then what can be 2+8+9?`,
    answer: `10! (Consider the first letter of the spelling of each digit, One+Nine+Eight= ONE, similarly Two+Eight+Nine= TEN)`,
  },
  {
    question: `Mrs. Jones was very proud of her apple tree. One autumn, after harvesting her apples, she called her 3 sons together. “Here are 150 apples,” she said. I want you to take them to the market tomorrow and sell them for me. She gave Paul 15 apples, Nick 50, and Ben 85. “Your job,” added Mrs. Jones, “is to sell the apples in such a way that each of you brings home the same amount of money.” How do they do it?`,
    answer: `The first buyer purchases 12 dozen apples at $1 per dozen. Paul sells him one dozen and has three apples left; Nick sells him four-dozen and has two apples left, and Ben sells him seven-dozen and has one apple left. Then, a second buyer comes along and buys all their remaining apples for $3 a piece. The 3 brothers head home with $10 each.`,
  },
  {
    question: `If 9999 = 4, 8888 = 8, 1816 = 6, 1212 = 0, then 1919 =`,
    answer: `4`,
  },
  {
    question: `Why was math class so long?`,
    answer: `The teacher kept going off on a tangent.`,
  },
  {
    question: `If you multiply this number by any other number, the answer will always be the same. What number is this?`,
    answer: `Zero`,
  },
  {
    question: `There are 100 pairs of dogs in a zoo. Two pairs of babies are born for every dog. Unfortunately, 23 of the dogs have not survived. How many dogs would be left in total?`,
    answer: `977 dogs`,
  },
  {
    question: `What do you answer even though it never asks you questions?`,
    answer: `A doorbell or a phone`,
  },
  {
    question: `What word describes a woman who does not have all her fingers on one hand?`,
    answer: `Typical. She would not be so if she had 10 fingers on one hand.`,
  },
  {
    question: `First, think of the person who lives in disguise, who deals in secrets and tells naught but lies. Next, tell me what’s always the last thing to mend, the middle of the middle and the end of the end? Finally, give me the sound often heard during the search for a hard-to-find word. Now, string them together, and answer me this: Which creature would you be unwilling to kiss?`,
    answer: `A spider`,
  },
  {
    question: `Mr. and Mrs. Mustard have 6 daughters and each daughter has one brother. How many people are in the Mustard family?`,
    answer: `There are 9 Mustards in the family. Since each daughter shares the same brother, there are 6 girls, 1 boy, and Mr. and Mrs. Mustard.`,
  },
  {
    question: `What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire world signifies a great woman. What is the word?`,
    answer: `""`,
  },
  {
    question: `How can you drop a raw egg from a height onto a concrete floor without cracking it?`,
    answer: `Concrete floors are very hard to crack.`,
  },
  {
    question: `Strip the skin under my skin, and my flesh you’ll reveal. It tastes sweet and tart, now throw out the peel. What is it?`,
    answer: `Orange`,
  },
  {
    question: `Which of the following is the largest? Triangle, circle, square, or rectangle?`,
    answer: `Rectangle, it has the most letters`,
  },
  {
    question: `What building has the most stories?`,
    answer: `A library`,
  },
  {
    question: `Pronounced as 1 letter, And written with 3, 2 letters there are, and 2 only in me. I’m double, I’m single, I’m black blue, and grey, I’m read from both ends, and the same either way. What am I?`,
    answer: `Eye`,
  },
  {
    question: `Sometimes I shine, sometimes I’m dull, sometimes I am big, and sometimes I am small. I can be pointy, I can be curved, and don’t ask me questions because even though I’m sharp, I’m not smart enough to answer you. What am I?`,
    answer: `A knife`,
  },
  {
    question: `It was an especially hot day and a man was walking in the desert. In the distance, the man suddenly saw a restaurant. He rejoiced, ran to it, and immediately asked the waiter for a glass of water. Instead, the waiter pulled out a gun and pointed it at the man’s head. The man replied with, “thank you.” Why did the man thank the waiter?`,
    answer: `It was a water gun!`,
  },
  {
    question: `Who has married many women but was never married?`,
    answer: `The priest`,
  },
  {
    question: `I come from a mine and get surrounded by wood always. Everyone uses me. What am I?`,
    answer: `Pencil lead`,
  },
  {
    question: `I am believed to be one-dimensional, and tinier than anything can be. Many say I’m the basis of all that we see. What am I?`,
    answer: `A string`,
  },
  {
    question: `Break it and it gets better; set it and it’s harder to break.`,
    answer: `Record`,
  },
  {
    question: `Forward, I am heavy; backward, I am not. What am I?`,
    answer: `A ton`,
  },
  {
    question: `You measure my life in hours and I serve you by expiring. I’m quick when I’m thin and slow when I’m fat. The wind is my enemy.`,
    answer: `A candle`,
  },
  {
    question: `If you are running a race, and you pass the person in second, what place are you in?`,
    answer: `Second place`,
  },
  {
    question: `The cock crew, the sky was blue, and the bells in heaven were striking 11. ‘Tis time for this poor soul To go to heaven. What am I?`,
    answer: `The fox burying his grandmother under a hollybush.`,
  },
  {
    question: `A doctor and a bus driver are both in love with the same woman, an attractive girl named Sarah. The bus driver had to go on a long bus trip that would last a week. Before he left, he gave Sarah seven apples. Why?`,
    answer: `An apple a day keeps the doctor away!`,
  },
  {
    question: `You have me today, Tomorrow you’ll have more; As your time passes, I’m not easy to store; I don’t take up space, But I’m only in one place; I am what you saw, But not what you see. What am I?`,
    answer: `Memories`,
  },
  {
    question: `If two snakes marry, what will their towels say?`,
    answer: `Hiss and hers`,
  },
  {
    question: `On Christmas Eve, when Santa leaves his workshop at the North Pole, what direction does he travel?`,
    answer: `South. The only way to travel from the North Pole is south.`,
  },
  {
    question: `What four-letter word ends in it and can be found at the bottom of birdcages?`,
    answer: `Grit`,
  },
  {
    question: `People make me, save me, change me, raise me. What am I?`,
    answer: `Money`,
  },
  {
    question: `If someone is packing heat what are they carrying?`,
    answer: `A gun.`,
  },
  {
    question: `Four cars come to a four-way stop, each coming from a different direction. They can’t decide who got there first, so they all go forward at the same time. All 4 cars go, but none crash into each other. How is this possible?`,
    answer: `They all made right-hand turns.`,
  },
  {
    question: `With pointed fangs, I sit and wait. With piercing force, I crunch out fate. Grabbing victims, proclaiming might, physically joining with a single bite. What am I?`,
    answer: `A stapler`,
  },
  {
    question: `When does Christmas come before Thanksgiving?`,
    answer: `In the dictionary.`,
  },
  {
    question: `A drunk man comes home and finds his wife in bed with another man. He goes and grabs his gun out of the closet! What was opened first?`,
    answer: `A bottle.`,
  },
  {
    question: `If the end of the year is on December 31st, what is the end of Christmas?`,
    answer: `The letter ‘s.’ It’s the last letter in Christmas, so it’s obviously the end!`,
  },
  {
    question: `What does a man do only once in his lifetime, but women do once a year after they are 29?`,
    answer: `Turn 30`,
  },
  {
    question: `What did the smelly feet and smelly shoes say to each other before going on a long day of walking?`,
    answer: `This socks!`,
  },
  {
    question: `I have a head like a cat and feet like a cat, but I am not a cat. What am I?`,
    answer: ` A kitten`,
  },
  {
    question: `I shrink smaller every time I take a bath. What am I?`,
    answer: `Soap`,
  },
  {
    question: `A precious stone, as clear as diamond. Seek it out while the sun’s near the horizon. Though you can walk on water with its power, try to keep it, and it’ll vanish in an hour.`,
    answer: `ice`,
  },
  {
    question: `What cruel person would sit on a baby?`,
    answer: `babysitter`,
  },
  {
    question: `Name a weighty currency?`,
    answer: `Pound (£)`,
  },
  {
    question: `I can come in many colors Like red, yellow, orange, blue or green When you put my lead on paper Your drawings or writing can be seen`,
    answer: `Pencil`,
  },
  {
    question: `A bridge in a hollow And a hundred going over it No blacksmith, nor mason, nor carpenter built it.`,
    answer: `Frozen river`,
  },
];

function getRiddle() {
  return riddles[Math.floor(Math.random() * riddles.length)];
}

module.exports = getRiddle;
