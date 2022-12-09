const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  SelectMenuComponent,
  ActionRowBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
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
    .setName("addrole")
    .setDescription("Adds A Role To The Auto Reaction Roles Message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("The Message ID Of The Role Message")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option

        .setName("role")

        .setDescription("The Role To Add")

        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The Rolename To Display In The Message")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("The Emoji Corresponding To This Role")
        .setRequired(true)
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

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ManageRoles
      )
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ I Do Not Have Permission To Manage Roles")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
      return interaction.reply({
        embeds: [embed],
      })
    }

    const messageId = interaction.options.getString("message_id")
    let role = interaction.options.getRole("role")
    let roleDisplayName = interaction.options.getString("name")
    let roleEmoji = interaction.options.getString("emoji")

    const { guild } = interaction

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

    if (roleEmoji.includes(":")) {
      const emojiName = roleEmoji.split(":")[1]
      roleEmoji = await guild.emojis.cache.find(
        (emoji) => emoji.name === emojiName
      ).id
      console.log(roleEmoji)
    }

    const [fetchedMessage] = fetchCache(result.messageId)

    console.log(`fetchedMessage: ${fetchedMessage}`)
    if (!fetchedMessage) {
      return interaction.reply({
        content: "Wohoo.. Calm Down.. I Just Woke Up!!",
      })
    }

    // await addToCache(client, guild.id, fetchedMessage, roleEmoji, role.id)
    await addToCache({
      client,
      guildId: guild.id,
      message: fetchedMessage,
      emoji: roleEmoji,
      roleId: role.id,
      requiredRole: result.requiredRole,
    })

    let roleDesc = ""

    result.roles.push({
      emoji: /[0-9]/.test(roleEmoji.replaceAll("<:xd:", "").replaceAll(">", ""))
        ? `<:xd:${roleEmoji.replaceAll("<:xd:", "").replaceAll(">", "")}>`
        : roleEmoji.replaceAll("<:xd:", "").replaceAll(">", ""),
      label: roleDisplayName,
      role: role.id,
    })

    for (const rx of result.roles) {
      roleDesc += `${result.format
        .replaceAll(
          "$EMOJI",
          /[0-9]/.test(rx.emoji.replaceAll("<:xd:", "").replaceAll(">", ""))
            ? `<:xd:${rx.emoji.replaceAll("<:xd:", "").replaceAll(">", "")}>`
            : rx.emoji.replaceAll("<:xd:", "").replaceAll(">", "")
        )
        .replaceAll("$ROLE", rx.label)}\n\n`
    }

    console.log(fetchedMessage)

    let rEmbed = new EmbedBuilder()
      .setColor(result?.color ?? client.colors.PRIMARY)
      .setTitle(result.title)
      .setDescription(`${roleDesc}${result.extra}`)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    await fetchedMessage.edit({ embeds: [rEmbed] })

    const obj = {
      guildId: guild.id,
      channelId: fetchedMessage.channel.id,
      messageId: fetchedMessage.id,
      requiredRole: result.requiredRole,
      title: result.title,
      extra: result.extra,
      format: result.format,
    }

    await RoleMessage.findOneAndUpdate(
      obj,
      {
        ...obj,
        $addToSet: {
          roles: {
            emoji: roleEmoji,
            role: role.id,
            label: roleDisplayName,
          },
        },
      },
      { upsert: true }
    )
    const fChannel = await guild.channels.fetch(fetchedMessage.channel.id)
    const fMessage = await fChannel.messages.fetch(fetchedMessage.id)

    await fetchedMessage.react(roleEmoji)

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Role Added")
      .setDescription("The Role Has Been Added To The Auto Role Message")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    return interaction.reply({
      ephemeral: true,
      embeds: [embed],
    })
  },
}
