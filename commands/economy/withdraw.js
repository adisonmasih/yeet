const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("You Need Money? Huh? Well, Here You Go!")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("How Much Do You Wanna Withdraw?")
        .setRequired(true)
        .setMinValue(100)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());
    let amount = interaction.options.getNumber("amount");

    if (userData.bank < amount) {
      let embed = new EmbedBuilder()
        .setTitle(`You're Poor 😒`)
        .setDescription(
          `You Need \`${
            amount - userData.balance
          } 🪙\` More To Withdraw That Amount..`
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

    userData.balance += amount;
    userData.bank -= amount;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(
        `Yeet! Withdrew **${amount} ${client.emoji.yeetCoin}** From Bank`
      )
      .setColor(client.colors.PRIMARY)
      .setThumbnail(user.displayAvatarURL())
      .addFields([
        {
          name: "• Wallet",
          value: `** ${userData.balance ?? "0"} ${client.emoji.yeetCoin} **`,
          inline: true,
        },
        {
          name: "• Bank",
          value: `** ${userData.bank ?? "0"} / ${
            userData.bankLimit ?? "1000"
          } ${client.emoji.yeetCoin} **`,
          inline: true,
        },
      ])
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    return interaction.reply({
      embeds: [embed],
    });
  },
};
