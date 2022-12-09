const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const doOverlay = require("../../core/helpers/overlay");
const doTextOverlay = require("../../core/helpers/text_overlay");
const Jimp = require("jimp");

module.exports = {
  name: "locmeme",
  aliases: ["loc"],
  description: "Why Would Someone Want To Know Your Location!...?",
  args: {
    required: [
      {
        name: "search",
        type: "text",
      },
      {
        name: "who",
        type: "text",
      },
    ],
    separator: ", ",
  },
  async execute(message, args, client, mentions) {
    let reply = await message.reply({
      content: "Please Wait... :magic_wand:",
    });
    console.log(args);
    let user = mentions.size > 0 ? mentions.first() : message.author;
    let search = args[0];
    let who = args[1];

    let outputFilename = await doTextOverlay({
      target: "location.png",
      texts: [
        {
          content: search,
          X: 32,
          Y: 154,
          font: Jimp.FONT_SANS_14_BLACK,
        },
        {
          content: who.toUpperCase() + " wants to",
          X: 154,
          Y: 320,
          font: Jimp.FONT_SANS_16_BLACK,
        },
      ],
      assetsDir: "./assets/",
      outputsDir: "./outputs/",
    });

    const embed = new EmbedBuilder()
      .setTitle(`${user.username} sus...`)
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

    reply.edit({ content: "Here's Your **Location Meme**" });
    fs.unlinkSync(`./outputs/${outputFilename}`);
  },
};
