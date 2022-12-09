const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("TOTALLY Safe Deposit Box!!!!!")
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("How Much Do You Wanna Keep Safe?")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());
    let amount = interaction.options.getString("amount");

    if (amount == "max") {
      amount = userData.bankLimit - userData.bank;
    } else {
      amount = parseInt(amount);
    }

    if (isNaN(amount) || amount < 1000) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              "Please Input A Valid Number. Min Limit Is 1000. " +
                client.emoji.yeetCoin +
                "\n(If You Inputted `max`, Then Your Bank Is Probably Full..)"
            )
            .setColor(client.colors.PRIMARY)
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });
    }

    if (userData.balance < amount) {
      let embed = new EmbedBuilder()
        .setTitle(`You're Poor 😒`)
        .setDescription(
          `You Need **${amount - userData.balance} ${
            client.emoji.yeetCoin
          }** More To Deposit That Amount..`
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

    if (amount + userData.bank > userData.bankLimit) {
      let embed = new EmbedBuilder()
        .setTitle(`Max Bank!`)
        .setDescription(
          `${client.emoji.yeetWrongStanding} Cannot Deposit This Amount Cuz Of ur Bank Limit!`
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

    userData.balance -= amount;
    userData.bank += amount;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(`Deposited ${amount} ${client.emoji.yeetCoin} To Bank`)
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
