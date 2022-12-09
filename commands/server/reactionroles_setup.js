const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js")
const canvacord = require("canvacord")
const Profile = require("../../schemas/Profile")
const RoleMessage = require("../../schemas/RoleMessage")
const {
  fetchCache,
  addToCache,
  updateDirectCache,
} = require("../../features/guild/rr")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionroles")
    .setDescription("Setup A New Reaction Role!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("Setup New Reaction Roles!")
        .addChannelOption((option) =>
          option
            .addChannelTypes(ChannelType.GuildText)
            .setName("channel")

            .setDescription("The Channel You Want This To Be!")
        )
        .addStringOption((option) =>
          option
            .setName("title")
            .setDescription("The Title Of The Embed")
            .setMinLength(3)
            .setMaxLength(60)
        )
        .addStringOption((option) =>
          option
            .setName("extra")
            .setDescription("Some Extra Text At The Bottom Of The Embed")
            .setMaxLength(60)
        )
        .addStringOption((option) =>
          option
            .setName("format")
            .setDescription(
              "The Format For A The Role. Variables: $EMOJI & $ROLE | Eg: $EMOJI = $ROLE"
            )
        )
        .addRoleOption((option) =>
          option
            .setName("required_role")
            .setDescription(
              "Members With Only The Specified Role Will Be Able To Participate"
            )
        )
        .addStringOption((option) =>
          option.setName("color").setDescription("The Embed Color").addChoices(
            {
              name: "Default",
              value: "Default",
            },
            {
              name: "Transparent",
              value: "#2F3136",
            },
            {
              name: "Red",
              value: "Red",
            },
            {
              name: "White",
              value: "White",
            },
            {
              name: "Aqua",
              value: "Aqua",
            },
            {
              name: "Green",
              value: "Green",
            },
            {
              name: "Blue",
              value: "Blue",
            },
            {
              name: "Yellow",
              value: "Yellow",
            },
            {
              name: "Purple",
              value: "Purple",
            },
            {
              name: "Luminous Vivid Pink",
              value: "LuminousVividPink",
            },
            {
              name: "Gold",
              value: "Gold",
            },
            {
              name: "Orange",
              value: "Orange",
            },
            {
              name: "Grey",
              value: "Grey",
            },
            {
              name: "Navy",
              value: "Navy",
            }
          )
        )
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

    const { options, guild } = interaction
    const channel = options.getChannel("channel") || interaction.channel
    const title = options.getString("title") || "React For Roles:"
    const extra = options.getString("extra") || "Powered By YEET!"
    const format =
      options.getString("format") ||
      "$EMOJI <:yeerow_right:1023655620890607736> **$ROLE**"
    const requiredRole = options.getRole("required_role")?.id || guild.id
    const color = options.getString("color") || null
    const text = "✅ Great! Now Use `/addrole {ID}`"

    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    })

    let sentMessage = await channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.colors.PRIMARY)
          .setTitle(title)
          .setDescription(
            `**Message ID:** **$ID**\nNow Please Use The \`/addrole\` Command To Add Roles To The Message`
          )
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
    })

    await sentMessage.edit({
      embeds: [
        new EmbedBuilder()
          .setColor(color || client.colors.PRIMARY)
          .setTitle(title)
          .setDescription(
            `**Message ID:** **$ID**\nNow Please Use The \`/addrole\` Command To Add Roles To The Message`.replace(
              "$ID",
              sentMessage.id
            )
          )
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
    })

    updateDirectCache({
      client,
      message: sentMessage,
      guildId: guild.id,
      roles: {},
      requiredRole: requiredRole,
    })

    let roleMessageNew = new RoleMessage()
    roleMessageNew.guildId = guild.id
    roleMessageNew.channelId = channel.id
    roleMessageNew.messageId = sentMessage.id
    roleMessageNew.requiredRole = requiredRole
    roleMessageNew.extra = extra
    roleMessageNew.format = format
    roleMessageNew.color = color
    roleMessageNew.title = title
    roleMessageNew.roles = []

    await roleMessageNew.save()

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Message Sent")
      .setDescription(
        `**Message ID:** **${sentMessage.id}**\nNow Please Use The \`/addrole\` Command To Add Roles To The Message`
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    return interaction.editReply({
      ephemeral: true,
      embeds: [embed],
    })
  },
}
