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
const { getGames } = require("epic-free-games");
const prettyMilliseconds = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("epicgames")
    .setDescription("Gets This Week's Free Games From Epic Games"),
  testOnly: true,
  async execute(interaction, client) {
    let games = await getGames();
    let game = games.currentGames[0];
    game.url = `https://store.epicgames.com/en-US/p/${game.offerMappings[0]?.pageSlug}`;
    console.log(game);
    let embed = new EmbedBuilder()
      .setTitle("🥳 This weeks free games! 🥳")
      .setDescription(`Number of free games this week: 1`)
      .setImage(game.keyImages[0].url)
      .addFields([
        {
          name: `[${game.title}]`,
          value: `${game.description}\n${game.url ?? "https://google.com"}`,
        },
        {
          name: `${game.title} Is Free To Claim Until:`,
          value: `\`${new Date(game.effectiveDate).toLocaleString(undefined, {
            timeZone: "Asia/Kolkata",
          })}\``,
        },
        {
          name: "Acutal Price",
          value: `Calculated From Steam Prices\n\`$${
            game.price.totalPrice.originalPrice / 100
          }\``,
        },
      ])
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(game.url ?? "https://google.com")
        .setLabel(`${game.title}`)
        .setEmoji(client.emoji.epicGames)
    );

    interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
