const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Gets Your Or Another User's Balance")
    .addUserOption((option) =>
      option.setName("user").setDescription("The User To Get Balance Of")
    ),
  testOnly: true,
  args: {
    optional: [
      {
        name: "user",
        type: "user",
      },
    ],
  },
  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    const { inventory } = userData;
    let net = parseInt(userData.bank);
    let depNet = parseInt(userData.bank);

    for (const x in inventory) {
      if (x == "isInventory") continue;
      let item = client.custom.economy.items.get(x);
      console.log(item.buyPrice, " ---- net: ----", item.buyPrice);
      net += item.buyPrice;
      depNet += item.sellPrice;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Balance`)
      .setDescription(`Wohoo! Lets See Some Richy Richy!`)
      .setColor(client.colors.PRIMARY)
      .setThumbnail(user.displayAvatarURL())
      .addFields([
        {
          name: "• Wallet",
          value: `** ${userData.balance ?? "0"} ${client.emoji.yeetCoin} **`,
          inline: false,
        },
        {
          name: "• Bank",
          value: `** ${userData.bank ?? "0"} / ${
            userData.bankLimit ?? "1000"
          } ${client.emoji.yeetCoin} ** \`(${(
            (userData.bank / userData.bankLimit) *
            100
          ).toFixed(2)} / 100%)\``,
          inline: false,
        },
        {
          name: "• Net Worth",
          value: `**${net} ${client.emoji.yeetCoin}**`,
          inline: false,
        },
        {
          name: "• Depreciated Net Worth",
          value: `**${depNet} ${client.emoji.yeetCoin}**`,
          inline: false,
        },
      ])
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    interaction.reply({
      embeds: [embed],
    });
  },
};
