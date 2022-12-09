const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js")
const Welcome = require("../../schemas/Welcome")
const LevelSetup = require("../../schemas/LevelSetup")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("levelsetup")
    .setDescription("Configure The Leveling System!")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The Text To Send. Variables: $PING, $TAG, $GUILD")
        .setMinLength(3)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("send_type")
        .setDescription("Where To Send The Level Up Message?")
        .addChoices(
          {
            name: "On The Spot",
            value: "onthespot",
          },
          {
            name: "User's DM",
            value: "dm",
          },
          {
            name: "Specific Channel",
            value: "channel",
          },
          {
            name: "Quiet (No Message)",
            value: "quiet",
          }
        )
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          'The Channel To Send The Message In. Required If Send Type Is "channel"'
        )
        .addChannelTypes(ChannelType.GuildText)
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
        })
      return interaction.reply({
        embeds: [embed],
      })
    }

    let channelId =
      interaction.options.getChannel("channel")?.id || interaction.channel.id
    let text = interaction.options.getString("text") || ""
    let sendType = interaction.options.getString("send_type") || "onthespot"

    await interaction.deferReply({
      fetchReply: true,
    })

    const { guild } = interaction
    await LevelSetup.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        guildId: guild.id,
        channelId,
        sendType,
        text,
      },
      {
        upsert: true,
      }
    )

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription("✅ Level Config Updated!")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
    return interaction.editReply({
      embeds: [embed],
    })
  },
}
