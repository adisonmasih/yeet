const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Get A Weekly Dose Of Yeet Coins!!"),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    if (!userData?.cooldowns?.weekly) {
      userData.cooldowns.weekly = Date.now();
    }
    if (userData.cooldowns.weekly > Date.now()) {
      let embed = new EmbedBuilder()
        .setTitle(`Not So Soon.. `)
        .setDescription(
          `⏳ Bruh.. You Have Already Claimed Your Weekly.. 🥺 Try Again In \`${prettyMs(
            userData.cooldowns.weekly - Date.now(),
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

    const amount = 200000;

    userData.balance += amount;
    userData.cooldowns.weekly = Date.now() + 1000 * 60 * 60 * 24 * 7;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(
        `${client.emoji.yeetRightStanding} Yeet! You Claimed Your ${amount} ${client.emoji.yeetCoin} For The Week!`
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
