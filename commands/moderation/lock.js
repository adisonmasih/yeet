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
    .setName("lock")
    .setDescription(
      "Locks The Current Channel (Channel Isn't Locked For ADMINS)"
    ),
  testOnly: true,
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle(`This Channel is Locked`)
      .setDescription(
        "This Channel is now locked. You can't send messages in this channel."
      )
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

    try {
      await interaction.reply({
        embeds: [
          embed
            .setTitle("Locking Channel")
            .setDescription("Locking this channel..."),
        ],
      });

      interaction.channel.permissionOverwrites.edit(
        interaction.channel.guild.roles.everyone,
        { SendMessages: false }
      );
    } catch (e) {
      console.log("THIS CHANNEL IS ALREADY LOCKED!");
    }
  },
};
