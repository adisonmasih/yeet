const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Coin Flip Against Me?? Huh?")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("I Will Give You Heads :)")
        .setChoices(
          {
            name: "Heads",
            value: "heads",
          },
          {
            name: "Tails",
            value: "tails",
          }
        )
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let choice = interaction.options.getString("choice");
    let result = Math.random() < 0.5 ? "heads" : "tails";
    let botWins = result != choice;

    let embed = new EmbedBuilder()
      .setTitle(!botWins ? "Victory 🎉🥳" : "Defeat 🙊")
      .setDescription(
        `**You chose:** ${choice}\n**The coin landed on:** ${result}`
      )
      .setColor(client.colors.PRIMARY)
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
