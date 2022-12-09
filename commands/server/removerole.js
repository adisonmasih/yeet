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
  removeFromCache,
} = require("../../features/guild/rr")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Removes A Role From The Auto Reaction Roles Message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("The Message ID Of The Role Message")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("The Role To Add").setRequired(true)
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

    await interaction.deferReply()

    // const [fetchedMessage] = fetchCache(result.messageId)

    // console.log(`fetchedMessage: ${fetchedMessage}`)
    // if (!fetchedMessage) {
    //   return interaction.reply({
    //     content: "Wohoo.. Calm Down.. I Just Woke Up!!",
    //   })
    // }

    // await addToCache(client, guild.id, fetchedMessage, roleEmoji, role.id)

    let roleDesc = ""

    let rIndex =
      result.roles.findIndex((item) => {
        console.log(`item role: ${item.role}\nrole id: ${role.id}`)
        return item.role == role.id
      }) ?? null
    let tempStoreObj = result.roles[rIndex]
    console.log(`rindex: ${rIndex}\ntso: ${result.roles[rIndex]}`)
    let emoji = tempStoreObj.emoji

    if (rIndex != null) {
      result.roles.splice(rIndex, 1)
      console.log("after:\n", result.roles)
    }

    for (const rx of result.roles) {
      roleDesc += `${result.format
        .replaceAll(
          "$EMOJI",
          /[0-9]/.test(rx.emoji) ? `<:xd:${rx.emoji}>` : rx.emoji
        )
        .replaceAll("$ROLE", rx.label)}\n\n`
    }

    console.log(targetMessage)

    let rEmbed = new EmbedBuilder()
      .setColor(result.color || client.colors.PRIMARY)
      .setTitle(result.title)
      .setDescription(`${roleDesc}${result.extra}`)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    await targetMessage.edit({ embeds: [rEmbed] })

    const obj = {
      guildId: guild.id,
      channelId: targetMessage.channel.id,
      messageId: targetMessage.id,
      requiredRole: result.requiredRole,
      title: result.title,
      extra: result.extra,
      format: result.format,
    }

    if (result.roles[0] && !result.roles[0]["emoji"]) {
      result.roles = []
    }

    await RoleMessage.findOneAndUpdate(
      obj,
      {
        ...obj,
        roles: [...result.roles],
      },
      { upsert: true }
    )
    const fChannel = await guild.channels.fetch(targetMessage.channel.id)
    const fMessage = await fChannel.messages.fetch(targetMessage.id)

    await targetMessage.reactions.cache.get(emoji).remove()
    await removeFromCache(result.messageId, emoji, tempStoreObj.role)

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Role Removed")
      .setDescription("The Role Has Been Removed From The Auto Role Message")
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
