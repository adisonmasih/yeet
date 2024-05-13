const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Some Daily Fun Indeed..."),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    if (userData.cooldowns.daily > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle(`Not So Soon.. `)
        .setDescription(
          `⏳ Bruh.. You Have Already Claimed Your Daily.. 🥺 Try Again In \`${prettyMs(
            userData.cooldowns.daily - Date.now(),
            { verbose: true, secondsDecimalDigits: 0 }
          )}\``
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setColor(client.colors.RED);
      return interaction.reply({
        embeds: [embed],
      });
    }

    const amount = 25000;

    userData.balance += amount;
    userData.cooldowns.daily = Date.now() + 1000 * 60 * 60 * 24;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(
        `${client.emoji.yeetRightStanding} Yeet! You Claimed Your ${amount} ${client.emoji.yeetCoin} For Today`
      )
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    return interaction.reply({
      embeds: [embed],
    });
  },
};
