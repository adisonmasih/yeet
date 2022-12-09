const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const doOverlay = require("../../core/helpers/overlay");
const doTextOverlay = require("../../core/helpers/text_overlay");
const Jimp = require("jimp");

module.exports = {
  name: "cock",
  aliases: ["ck"],
  description: "Make Someone A Cock (Literally)",
  args: {
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let reply = await message.reply({
      content: "Please Wait... :magic_wand:",
    });
    let user = mentions.size > 0 ? mentions.first() : message.author;
    let outputFilename = await doOverlay({
      target: "cock.jpg",
      overlayUrl: user.displayAvatarURL({ extension: "png", size: 128 }),
      resizeDimensions: {
        height: 110,
        width: 110,
      },
      placement: {
        X: 280,
        Y: 42,
      },
      assetsDir: "assets/",
      outputsDir: "outputs/",
    });

    const embed = new EmbedBuilder()
      .setTitle("A Fat Cock! Just Saying...")
      .setImage("attachment://result.png");

    await message.channel.send({
      embeds: [embed],
      files: [
        {
          attachment: `./outputs/${outputFilename}`,
          name: "result.png",
        },
      ],
    });

    reply.edit({ content: "Here's Your **Cock**" });
    fs.unlinkSync(`./outputs/${outputFilename}`);
  },
};
