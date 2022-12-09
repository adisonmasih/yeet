const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  description: "Let's Bet",
  args: {
    optional: [
      {
        name: "choice",
        type: "text",
      },
    ],
    // separator: "__NO_SEPARATOR__",
  },
  async execute(message, args, client, mentions) {
    let choice = (args[0] ?? "").toString();
    if (!["heads", "tails"].includes(choice.toLowerCase())) {
      choice = "heads";
    }

    let result = Math.random() < 0.5 ? "heads" : "tails";
    let botWins = result != choice;

    let embed = new EmbedBuilder()
      .setTitle(!botWins ? "Victory 🎉🥳" : "Defeat 🙊")
      .setDescription(
        `**You chose:** ${choice}\n**The coin landed on:** ${result}`
      )
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Requested By: ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      });

    message.reply({
      embeds: [embed],
    });
  },
};
