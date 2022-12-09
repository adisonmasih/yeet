const generateNameSense = require("../../core/namesense");
const figlet = require("figlet");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "figlet",
  aliases: ["fig"],
  description:
    "You Know When The Text Is Displayed With Lines And Symbols And It Looks Cool",
  args: {
    required: [
      {
        type: "text",
        name: "text",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let text = "";
    args.forEach((word) => {
      text += word + " ";
    });
    if (text.match(client.config.regex.emoji)) {
      let embed = new EmbedBuilder()
        .setTitle("Error!")
        .setDescription("Only letters, numbers & spaces are allowed.")
        .setColor(client.colors.RED)
        .setAuthor({
          name: message.member.displayName,
          iconURL: message.member.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    const figletText = figlet.textSync(text);
    message.reply({
      content: `\`\`\`${figletText}\`\`\``,
    });
  },
};
