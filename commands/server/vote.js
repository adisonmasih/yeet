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
const canvacord = require("canvacord")
const Profile = require("../../schemas/Profile")
const RoleMessage = require("../../schemas/RoleMessage")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote For Yeet And Get Exclusive Rewards!"),
  testOnly: true,
  async execute(interaction, client) {
    let fakeId = client.custom.economy.items.get("fake_id")
    let robBook = client.custom.economy.items.get("rob_book")
    let embed = new EmbedBuilder()
      .setTitle("Vote For Yeet!")
      .setDescription(
        `Vote For Yeet And Get:\n<:${fakeId.slug}:${fakeId.icon}> **1x ${fakeId.name}**\n<:${robBook.slug}:${robBook.icon}> **1x ${robBook.name}**\n${client.emoji.yeetCoin} **100,000**\n\n**[[WEBSITE]](https://yeetbot.ml) | [[INVITE ME]](https://invite.yeetbot.ml) | [[SUPPORT SERVER]](http://discord.yeetbot.ml/)**`
      )
      .setColor(client.colors.GREY)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })

    const row = new ActionRowBuilder()
    row.addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Visit Website")
        .setURL("https://yeetbot.ml"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Invite Me")
        .setURL("https://invite.yeetbot.ml/"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Join Official Server")
        .setURL("https://discord.yeetbot.ml/")
    )

    const row2 = new ActionRowBuilder()
    row2.addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Vote On Top.gg")
        .setURL("https://top.gg/bot/990577825922842634/vote"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Vote On DiscordBotList")
        .setURL("https://discordbotlist.com/bots/yeet-8852/upvote")
    )

    return interaction.reply({
      embeds: [embed],
      components: [row, row2],
    })
  },
}
