const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Ohh You Little Begger.. Come Here And Get Some Money"),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    if (userData.cooldowns.beg > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle("Don't Beg Too Much..")
        .setDescription(
          `⏳ Stop Begging Too Much You Can Beg Again In \`${prettyMs(
            userData.cooldowns.beg - Date.now(),
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

    const luck = Math.random() * 100;
    const amount = Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000;

    if (luck <= 40) {
      userData.cooldowns.beg = Date.now() + 1000 * 35;
      userData.save();

      let embed = new EmbedBuilder()
        .setTitle("Task Failed Successfully!")
        .setDescription(
          `🥺 You got nothing this time, maybe try hard next time?`
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
    userData.cooldowns.beg = Date.now() + 1000 * 35;
    userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Wohooo!`)
      .setDescription(
        `Oh my! You begged and earned ${amount} ${client.emoji.yeetCoin}`
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
          value: `** ${userData.bank ?? "0"} / ${userData.bankLimit ?? "1000"
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
