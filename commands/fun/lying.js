const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lying")
    .setDescription("Is this person lying?")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who's our target")
    ),
  testOnly: false,
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;

    const isLying = Math.random() < 0.5;

    let embed = new EmbedBuilder()
      .setTitle("Is " + user.username + " Lying?")
      .setDescription(isLying ? "Yes" : "No")
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
