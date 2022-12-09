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
    .setName("roleembed")
    .setDescription("Setup A New Reaction Role!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("update")
        .setDescription("Update A Role Embed")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Role Message Id")
            .setRequired(true)
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
    const messageId = options.getString("message_id")

    const result = await RoleMessage.findOne({
      messageId,
    })

    if (!result) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ No Auto Role Message Found")
        .setDescription(
          "Please Use The `/reactionroles setup` command to set up the auto role message"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
      return interaction.reply({
        embeds: [embed],
      })
    }

    const targetChannel = await guild.channels.cache.get(result.channelId)
    if (!targetChannel) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Channel")
        .setDescription(
          "The Channel Used to Setup The Auto Role Message No Longer Exists. Please Use The `send` command to set up the auto role message again"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
      return interaction.reply({
        embeds: [embed],
      })
    }

    const targetMessage = await targetChannel.messages.fetch(result.messageId, {
      cache: true,
      force: true,
    })

    if (!targetMessage) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Invalid Message")
        .setDescription(
          "The Message Used to Setup The Auto Role No Longer Exists. Please Use The `/reactionroles setup` command to set up the auto role message again"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
      return interaction.reply({
        embeds: [embed],
      })
    }

    // updateDirectCache({
    //   client,
    //   message: sentMessage,
    //   guildId: guild.id,
    //   roles: {},
    //   requiredRole: requiredRole,
    // })

    const channel = options.getChannel("channel")?.id || result.channelId
    const title = options.getString("title") || result.title
    const extra = options.getString("extra") || result.extra
    const format = options.getString("format") || result.format
    const requiredRole =
      options.getRole("required_role")?.id || result.requiredRole
    const color = options.getString("color") || result.color
    const text = "✅ Great! Now Use `/addrole {ID}`"

    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    })

    await RoleMessage.updateOne(
      {
        messageId,
      },
      {
        channelId: channel,
        title,
        extra,
        format,
        requiredRole,
        color,
      }
    )

    let roleDesc = ""

    for (const rx of result.roles) {
      roleDesc += `${format
        .replaceAll(
          "$EMOJI",
          /[0-9]/.test(rx.emoji) ? `<:xd:${rx.emoji}>` : rx.emoji
        )
        .replaceAll("$ROLE", rx.label)}\n\n`
    }

    console.log(targetMessage)

    let rEmbed = new EmbedBuilder()
      .setColor(color || client.colors.PRIMARY)
      .setTitle(title)
      .setDescription(`${roleDesc}${extra}`)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    await targetMessage.edit({ embeds: [rEmbed] })

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Embed Updated")
      .setDescription(`The Embed Has Been Updated Successfully!`)
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
