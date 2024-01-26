const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js")

// const { PARENT_ID, OPEN_TICKET } = process.env;
const TicketSetup = require("../../schemas/TicketSetup")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketsetup")
    .setDescription("The Ticketing System For Yeet!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription('The "Open A Ticket" Channel')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription(
          "The Channel Category Under Which All The Tickets Would Be Created"
        )
        .addChannelTypes(ChannelType.GuildCategory)
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("transcripts")
        .setDescription("The Ticket Transcripts Channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("handler_role")
        .setDescription("Select The Ticket Handlers' Role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("everyone_role")
        .setDescription("Select The @everyone Role | ITS IMPORTANT")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("categories")
        .setDescription(
          "Comma Seperated Ticket Categories (Max 3). Eg: '⚠️ Member Reports, 🪲 Bug Reports, ❓ Other'"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Set The Description Of The Ticket Creation Embed")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const { guild, channel, member, options } = interaction

    let errorEmbed = new EmbedBuilder().setColor("Red").setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL(),
    })

    let successEmbed = new EmbedBuilder()
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    const ticketChannel = options.getChannel("channel")
    const channelCategory = options.getChannel("category")
    const transcriptsChannel = options.getChannel("transcripts")
    const handlerRole = options.getRole("handler_role")
    const everyoneRole = options.getRole("everyone_role")
    const description =
      options.getString("description") ||
      `Open A Ticket To Discuss Any Of The Issues Listed On The Buttons`

    let categories = []

    try {
      const categoriesString = options
        .getString("categories")
        .replaceAll(", ", ",")
        .split(",")

      categoriesString.forEach((c) => {
        c = c.split(" ")
        categories.push({
          emoji: c.shift(),
          label: c.join(" "),
        })
      })
    } catch (e) {
      return interaction.reply({
        embeds: [
          embed.setDescription(`${client.emoji.yeetWrongStanding} | Please Provide Valid Categories!\n
          👉 Eg: '⚠️ Member Reports, 🪲 Bug Reports, ❓ Other' (Max 3)`),
        ],
      })
    }

    await TicketSetup.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        guildId: guild.id,
        channelId: ticketChannel.id,
        transcriptsChannelId: transcriptsChannel.id,
        handlers: handlerRole.id,
        everyoneId: everyoneRole.id,
        description,
        buttons: categories,
        category: channelCategory,
      },
      {
        new: true,
        upsert: true,
      }
    )

    let embed = new EmbedBuilder()
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: `${guild.name} | Ticketing System | Powered By YEET`,
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .setDescription(description)

    let row = new ActionRowBuilder()

    const indexButtonStyles = {
      0: ButtonStyle.Primary,
      1: ButtonStyle.Secondary,
      2: ButtonStyle.Success,
    }

    let i = 0
    for (let bt of categories) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`ticket:${bt.label}`)
          .setLabel(bt.label)
          .setStyle(indexButtonStyles[i])
          .setEmoji(bt.emoji)
      )
      i++
    }

    await ticketChannel.send({
      embeds: [embed],
      components: [row],
    })

    return interaction.reply({
      embeds: [
        successEmbed.setDescription(
          `${client.emoji.yeetRightStanding} All Set! You're Ready To Go!`
        ),
      ],
    })
  },
}
