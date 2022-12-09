const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder,
  User,
} = require("discord.js");
const Punishment = require("../../schemas/Punishment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks The Current Channel"),
  testOnly: true,
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle(`This Channel is Unlocked`)
      .setDescription("This Channel is now Unlocked.")
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      });

    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        embeds: [
          embed
            .setTitle("Insufficient Permissions")
            .setDescription(
              "You do not have the required permissions to use this command."
            ),
        ],
      });
    }

    interaction.channel.permissionOverwrites.edit(
      interaction.channel.guild.roles.everyone,
      { SendMessages: true }
    );

    try {
      await interaction.reply({
        embeds: [
          embed.setTitle("Yeet!").setDescription("Unlocked This Channel..."),
        ],
      });
    } catch (e) {
      console.log("THIS CHANNEL IS ALREADY UNLOCKED!");
    }
  },
};
