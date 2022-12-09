const getWasted = require("../../core/wasted_logic");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "waste",
  aliases: ["w"],
  description: "Why Wait To Trash Out Waste?",
  args: {
    required: [
      {
        type: "user",
        name: "target",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let target = mentions.first();
    let memeUrl = getWasted();

    const embed = new EmbedBuilder()
      .setTitle(`${target.username} Was Wasted By ${message.author.username}!`)
      .setImage(memeUrl)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setColor(client.colors.PRIMARY);

    await message.reply({
      embeds: [embed],
    });
  },
};
