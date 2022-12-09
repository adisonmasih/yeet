const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("I Wouldn't Call That A Steal.. Would Never")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who's Avatar Do You Want To See?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;

    let embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setDescription("That's Not A Steal.. I'm Not That Kind Of Bot 😗")
      .setColor(client.colors.PRIMARY)
      .setImage(user.displayAvatarURL({ size: 2048 }))
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
