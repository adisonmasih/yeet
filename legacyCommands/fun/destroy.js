const { getDestroyCaption, getDestroyMeme } = require("../../core/destroy");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "destroy",
  aliases: ["d"],
  description: "You Like Destruction? This Will Make You See One!",
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
    let destruction = getDestroyCaption()
      .replaceAll("$", target.username)
      .replaceAll("@", message.author.username);
    let memeUrl = getDestroyMeme();

    const embed = new EmbedBuilder()
      .setTitle(destruction)
      .setImage(memeUrl)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setColor(client.colors.RED);

    await message.reply({
      embeds: [embed],
    });
  },
};
