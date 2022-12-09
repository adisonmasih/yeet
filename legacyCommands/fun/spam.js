const generateNameSense = require("../../core/namesense");
const figlet = require("figlet");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "spam",
  aliases: ["sp"],
  description: "Are You Sure? (Only 10 Times)",
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
    await message.reply({
      content: text,
    });

    let interval = setInterval(() => {
      message.channel.send({
        content: text,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  },
};
