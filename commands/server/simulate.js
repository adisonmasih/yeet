const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const Welcome = require("../../schemas/Welcome");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("simulate")
    .setDescription("Simulates A Fake Join...")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Which User Do You Want To Simulate For?")
    ),
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

    let user = interaction.options.getUser("user") || interaction.user;
    let member = await interaction.guild.members.cache.get(user.id);

    await interaction.reply({
      content: "Successfully Simulated A Join!",
    });

    await client.emit("guildMemberAdd", member);
  },
};
