const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Hard Work Is The Key To Success - Some Nerd"),
  testOnly: true,
  async execute(interaction, client) {
    const professions = [
      "Farmer 🌾",
      "Miner 🗿",
      "Lumberjack 🌲",
      "Doctor 💊",
      "Scientist 🔬",
      "Engineer 💎",
      "Actor 🎭",
      "Pilot 🛩",
      "Lawyer 💼",
      "Accountant 💳",
      "Teacher 🏫",
      "Artist 🎨",
      "Musician 🎶",
      "Writer 📝",
      "Programmer 💻",
      "Designer 🎨",
      "Architect 🏢",
      "Toiler Cleaner 🚿",
      "Nurse 🏥",
      "Janitor 🛀",
      "Photographer 📷",
      "Waiter 🍽️",
      "Baby Sitter 👶",
      `Porn Star ${client.emoji.johhnySins}`,
    ];
    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    if (userData.cooldowns.work > Date.now() && !client.isSpecial(user.id)) {
      let embed = new EmbedBuilder()
        .setTitle("You're Too Tired!")
        .setDescription(
          `You're too tired to work right now. You Can Work Again In \`${prettyMs(
            userData.cooldowns.work - Date.now(),
            { verbose: true, secondsDecimalDigits: 0 }
          )}\``
        );
      return interaction.reply({
        embeds: [embed],
      });
    }

    let earnedCoins = Math.floor(Math.random() * 100);
    let profession =
      professions[Math.floor(Math.random() * professions.length)];

    userData.balance += earnedCoins;
    userData.cooldowns.work = Date.now() + 1000 * 60 * 60;

    await userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`Hard Work Mate 🥵`)
      .setDescription(
        `You Worked As A ${profession} And Earned ${earnedCoins} 🪙`
      )
      .setColor(client.colors.PRIMARY)
      .setThumbnail(user.displayAvatarURL())
      .addFields([
        {
          name: "• Wallet",
          value: `**\` ${userData.balance ?? "0"} 🪙 \`**`,
          inline: true,
        },
        {
          name: "• Bank",
          value: `**\` ${userData.bank ?? "0"} 🪙 \`**`,
          inline: true,
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
