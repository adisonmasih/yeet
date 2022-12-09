const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { getGreet, getMessage } = require("../../core/greet");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("greet")
    .setDescription("Greet Some New People!")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    let memeUrl = getGreet();

    const embed = new EmbedBuilder()
      .setTitle(getMessage(interaction.user.username, user.username))
      .setImage(memeUrl)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor(client.colors.PRIMARY);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
