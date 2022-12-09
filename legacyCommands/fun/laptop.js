const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const doOverlay = require("../../core/helpers/overlay");
const doTextOverlay = require("../../core/helpers/text_overlay");
const Jimp = require("jimp");

module.exports = {
  name: "laptop",
  aliases: ["lpt"],
  description: "Wow Laptop i9 69th Gen..",
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
      target: "macbook.jpg",
      overlayUrl: user.displayAvatarURL({ extension: "png", size: 128 }),
      resizeDimensions: {
        height: 60,
        width: 60,
      },
      placement: {
        X: 292.5,
        Y: 170,
      },
      assetsDir: "assets/",
      outputsDir: "outputs/",
    });

    const embed = new EmbedBuilder()
      .setTitle(`${user.username} Has A Laptop!`)
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

    reply.edit({
      content: `I Can Already Guess The Most Visited Site ${client.emoji.trollFace}`,
    });
    fs.unlinkSync(`./outputs/${outputFilename}`);
  },
};
