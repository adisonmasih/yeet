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
    .setName("unmute")
    .setDescription("Unmutes An User")
    .addUserOption((option) =>
      option.setName("user").setDescription("Unmute Who?").setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle(`DEFAULT`)
      .setDescription("DEFAULT")
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      });

    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.MuteMembers)
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

    // args.shift();

    let user = interaction.options.getUser("user");

    try {
      const member = await interaction.guild.members.fetch(user.id);
      if (member) {
        await member.timeout(null, "secret");
      }
    } catch (e) {
      console.log(e);
      return interaction.reply({
        embeds: [
          embed.setTitle("Error!").setDescription(`Cannot Unmute That User!`),
        ],
      });
    }

    return interaction.reply({
      embeds: [
        embed.setTitle("Yeet!").setDescription(`Unmuted **${user.tag}**`),
      ],
    });
  },
};
