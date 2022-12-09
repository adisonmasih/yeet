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
    .setName("clear")
    .setDescription("Clear Some Shit Out..")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("How Many Messages To Clear?")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let count = interaction.options.getNumber("amount") || 10;
    // interaction.deferReply();
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
        .has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.editReply({
        embeds: [
          embed
            .setTitle("Insufficient Permissions")
            .setDescription(
              "You do not have the required permissions to use this command."
            ),
        ],
      });
    }
    if (typeof count !== "number" || count <= 0 || count > 100) {
      return interaction.reply({
        embeds: [
          embed
            .setTitle("Invalid Count")
            .setDescription(
              "Please Enter a valid number less than 100 and greater than 1"
            ),
        ],
      });
    }

    try {
      const { size } = await interaction.channel.bulkDelete(count, true);
      return interaction.reply({
        embeds: [
          embed
            .setTitle("Yeet Purge!")
            .setDescription(`Deleted ${size} message(s)!`),
        ],
      });
    } catch (e) {
      console.log(e);
      return interaction.editReply({
        embeds: [
          embed
            .setTitle("Something Went Wrong!")
            .setDescription("Buggy Buggy Snuggy Snuggy!"),
        ],
      });
    }
  },
};
