const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

let responses = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "It's possible.",
  "It's uncertain.",
  "The stars say no.",
  "The universe says yes.",
  "Maybe in another timeline.",
  "Yes, but with caution.",
  "The odds are in your favor.",
  "Not in the cards.",
  "Not looking good.",
  "Certainly not.",
  "Absolutely!",
  "Absolutely not!",
  "Chances are high.",
  "Chances are slim.",
  "Looking good.",
  "Looking bleak.",
  "It's probable.",
  "It's improbable.",
  "Definitely!",
  "Definitely not!",
  "Certainly!",
  "Certainly not!",
  "Highly likely.",
  "Highly unlikely.",
  "In your dreams.",
  "Inevitable.",
  "Impossible.",
  "Possible, but unlikely.",
  "Likely, but not guaranteed.",
  "Uncertain, proceed with caution."
]


module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("BROOO MAGIC BROOO!!!!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Any Question (Maybe Your Future Girlfriend's Name?)")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const question = interaction.options.getString("question");
    let answer = responses[Math.floor(Math.random() * responses.length)];

    let embed = new EmbedBuilder()
      .setTitle(question + "?")
      .setDescription(answer)
      .setColor(client.colors.GREEN)
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
