const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Get A Monthly Dose Of Yeet Coins!!"),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    if (!userData?.cooldowns?.monthly) {
      userData.cooldowns.monthly = Date.now();
    }
    if (userData.cooldowns.monthly > Date.now()) {
      let embed = new EmbedBuilder()
        .setTitle(`Not So Soon.. `)
        .setDescription(
          `⏳ Bruh.. You Have Already Claimed Your monthly.. 🥺 Try Again In \`${prettyMs(
            userData.cooldowns.monthly - Date.now(),
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

    const amount = 200000 * 5;

    userData.balance += amount;
    userData.cooldowns.monthly = Date.now() + 1000 * 60 * 60 * 24 * 7 * 4;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(
        `${client.emoji.yeetRightStanding} Yeet! You Claimed Your ${amount} ${client.emoji.yeetCoin} For The Month!`
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
