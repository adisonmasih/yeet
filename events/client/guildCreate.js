const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelFlags,
  ChannelType,
  PermissionsBitField,
  PermissionFlagsBits,
  PermissionOverwriteManager,
  PermissionOverwrites,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const moongose = require("mongoose");
const Option = require("../../schemas/Option");
module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    try {
      const embed = new EmbedBuilder()
        .setTitle("A Wild Yeet Just Appeared!")
        .setDescription(
          `**[[WEBSITE]](https://yeetbot.ml) | [[INVITE ME]](https://invite.yeetbot.ml) | [[SUPPORT SERVER]](http://discord.yeetbot.ml/)**\n\nHey! I'm **Yeet!**, The Multipurpose + Powerful Bot! Thanks For Inviting Me To **${guild.name}**. To View All My Commands, Run \`/help\`!`
        )
        .setColor(client.colors.GREY)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      const row = new ActionRowBuilder();
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
      );

      const row2 = new ActionRowBuilder();
      row2.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Vote On Top.gg")
          .setURL("https://top.gg/bot/990577825922842634/vote"),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Vote On DiscordBotList")
          .setURL("https://discordbotlist.com/bots/yeet-8852/upvote")
      );

      await guild?.systemChannel?.send?.({
        embeds: [embed],
        components: [row, row2],
      });
    } catch (e) {
      console.log(e);
    }
  },
};
