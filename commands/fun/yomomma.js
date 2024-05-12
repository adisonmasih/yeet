const jokes = [
  "Yo momma is so fat, when she wears a yellow raincoat, people yell 'Taxi!'",
  "Yo momma is so stupid, she put two quarters in her ears and thought she was listening to 50 Cent.",
  "Yo momma is so old, when she was in school, history was called 'current events'.",
  "Yo momma is so short, you can see her feet on her driver's license.",
  "Yo momma is so poor, when I asked her what's for dinner, she took off her shoelaces and said 'Spaghetti'.",
  "Yo momma is so ugly, when she walks into a bank, they turn off the surveillance cameras.",
  "Yo momma is so lazy, she thinks a two-income family is where your mom has two jobs.",
  "Yo momma is so fat, when she went to the beach, Greenpeace showed up and tried to drag her back into the ocean.",
  "Yo momma is so ugly, she made One Direction go another direction.",
  "Yo momma is so fat, she sat on an iPhone and turned it into an iPad.",
  "Yo momma is so old, when she was born, the Dead Sea was just getting sick.",
  "Yo momma is so stupid, she tried to climb Mountain Dew.",
  "Yo momma is so fat, when she wears a yellow coat, people yell 'Hey, taxi!'",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, she leaves stretch marks on the bath water.",
  "Yo momma is so old, she has a picture of Moses in her yearbook.",
  "Yo momma is so stupid, she thought a quarterback was a refund.",
  "Yo momma is so fat, I took a picture of her last Christmas and it's still printing.",
  "Yo momma is so old, her birth certificate says 'Expired' on it.",
  "Yo momma is so stupid, she took a spoon to the Super Bowl.",
  "Yo momma is so fat, when she went to school, she sat next to everybody.",
  "Yo momma is so ugly, when she looks in the mirror, her reflection looks away.",
  "Yo momma is so fat, even Dora couldn't explore her.",
  "Yo momma is so old, she walked out of a museum and the alarm went off.",
  "Yo momma is so stupid, she took a ruler to bed to see how long she slept.",
  "Yo momma is so fat, she stepped on a scale and it said 'To be continued'.",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, she doesn't need the internet; she's already worldwide.",
  "Yo momma is so old, her birth certificate says 'Expired' on it.",
  "Yo momma is so stupid, she went to a Clippers game to get a haircut.",
  "Yo momma is so fat, when she wears a yellow raincoat, people yell 'Taxi!'",
  "Yo momma is so ugly, she makes onions cry.",
  "Yo momma is so poor, she waves around a popsicle stick and calls it air conditioning.",
  "Yo momma is so fat, she's on both sides of the family.",
  "Yo momma is so old, she knew Burger King when he was just a prince.",
  "Yo momma is so stupid, she tried to wake up a sleeping bag.",
  "Yo momma is so fat, when she steps on the scale, it says 'One at a time, please'.",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, she has more rolls than a bakery.",
  "Yo momma is so old, when she was young, rainbows were black and white.",
  "Yo momma is so stupid, she put lipstick on her forehead to make up her mind.",
  "Yo momma is so fat, her belt size is 'Equator'.",
  "Yo momma is so ugly, even Hello Kitty said goodbye.",
  "Yo momma is so fat, her driver's license says 'Picture continued on other side'.",
  "Yo momma is so old, she has a picture of Moses in her yearbook.",
  "Yo momma is so stupid, she put a quarter in a parking meter and waited for a gumball to come out.",
  "Yo momma is so fat, when she wears a yellow raincoat, people yell 'Taxi!'",
  "Yo momma is so ugly, when she walks into a bank, they turn off the surveillance cameras.",
  "Yo momma is so fat, when she gets in an elevator, it HAS to go down.",
  "Yo momma is so old, her birth certificate is in Roman numerals.",
  "Yo momma is so stupid, she tried to put M&Ms in alphabetical order.",
  "Yo momma is so fat, when she wears a yellow coat, people yell 'Hey, taxi!'",
  "Yo momma is so ugly, when she joined an ugly contest, they said 'Sorry, no professionals'.",
  "Yo momma is so poor, she can't afford to pay attention!",
  "Yo momma is so fat, when she steps on a scale, it says 'One at a time, please'.",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, when she gets on the scale, it says 'To be continued'.",
  "Yo momma is so old, when she was in school, history was called 'current events'.",
  "Yo momma is so stupid, she got locked in a grocery store and starved to death.",
  "Yo momma is so fat, when she goes camping, the bears hide their food.",
  "Yo momma is so ugly, she makes blind children cry.",
  "Yo momma is so poor, she waves around a popsicle stick and calls it air conditioning.",
  "Yo momma is so fat, she doesn't need the internet; she's already worldwide.",
  "Yo momma is so old, she knew Burger King when he was just a prince.",
  "Yo momma is so stupid, she put lipstick on her forehead to make up her mind.",
  "Yo momma is so fat, when she goes to an amusement park, people try to ride HER.",
  "Yo momma is so ugly, she turned Medusa to stone.",
  "Yo momma is so poor, when I asked her what's for dinner, she took off her shoelaces and said 'Spaghetti'.",
  "Yo momma is so fat, when she steps on a scale, it says 'One at a time, please'.",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, when she steps on the scale, it says 'To be continued'.",
  "Yo momma is so old, when she was in school, history was called 'current events'.",
  "Yo momma is so stupid, she got locked in a grocery store and starved to death.",
  "Yo momma is so fat, when she goes camping, the bears hide their food.",
  "Yo momma is so ugly, she makes blind children cry.",
  "Yo momma is so poor, she waves around a popsicle stick and calls it air conditioning.",
  "Yo momma is so fat, she doesn't need the internet; she's already worldwide.",
  "Yo momma is so old, she knew Burger King when he was just a prince.",
  "Yo momma is so stupid, she put lipstick on her forehead to make up her mind.",
  "Yo momma is so fat, when she goes to an amusement park, people try to ride HER.",
  "Yo momma is so ugly, she turned Medusa to stone.",
  "Yo momma is so poor, when I asked her what's for dinner, she took off her shoelaces and said 'Spaghetti'.",
  "Yo momma is so fat, when she steps on a scale, it says 'One at a time, please'.",
  "Yo momma is so ugly, her portraits hang themselves.",
  "Yo momma is so fat, when she steps on the scale, it says 'To be continued'.",
  "Yo momma is so old, when she was in school, history was called 'current events'.",
  "Yo momma is so stupid, she got locked in a grocery store and starved to death.",
  "Yo momma is so fat, when she goes camping, the bears hide their food.",
  "Yo momma is so ugly, she makes blind children cry.",
  "Yo momma is so poor, she waves around a popsicle stick and calls it air conditioning.",
  "Yo momma is so fat, she doesn't need the internet; she's already worldwide.",
  "Yo momma is so old, she knew Burger King when he was just a prince.",
  "Yo momma is so stupid, she put lipstick on her forehead to make up her mind.",
  "Yo momma is so fat, when she goes to an amusement park, people try to ride HER.",
  "Yo momma is so ugly, she turned Medusa to stone.",
  "Yo momma is so poor, when I asked her what's for dinner, she took off her shoelaces and said 'Spaghetti'."
]

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("yomomma")
    .setDescription(
      "Yo mamma is so fat when I said release the Kraken, your mom came"
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("Who's Mom?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("target") || interaction.user;
    let joke = jokes[Math.floor(Math.random() * jokes.length)];

    let embed = new EmbedBuilder()
      .setTitle("Yo Momma Joke!!")
      .setDescription(`<@${user.id}>, ${joke}`)
      .setColor(client.colors.RED)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Requested By: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({
      embeds: [embed],
    });
  },
};
