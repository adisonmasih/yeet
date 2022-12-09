const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const Welcome = require("../../schemas/Welcome");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("simulatecreate")
    .setDescription("Simulates Yeet Join!"),
  testOnly: true,
  async execute(interaction, client) {
    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return interaction.reply({
        embeds: [embed],
      });
    }

    await interaction.reply({
      content: "Successfully Simulated Yeet Add!",
    });

    await client.emit("guildCreate", interaction.guild);
  },
};
