const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const doOverlay = require("../../core/helpers/overlay");
const doTextOverlay = require("../../core/helpers/text_overlay");
const Jimp = require("jimp");

const templates = [
  {
    filename: "couple.jpg",
    resizeDimensions: {
      width: 468,
      height: 468,
    },
    placement: {
      X: 130,
      Y: 5,
    },
  },
  {
    filename: "couple2.jpg",
    resizeDimensions: {
      height: 160,
      width: 160,
    },
    placement: {
      X: 120,
      Y: 13,
    },
  },
  {
    filename: "couple3.jpg",
    resizeDimensions: {
      height: 180,
      width: 180,
    },
    placement: {
      X: 210,
      Y: 28,
    },
  },
  {
    filename: "couple4.jpg",
    resizeDimensions: {
      height: 330,
      width: 330,
    },
    placement: {
      X: 300,
      Y: 10,
    },
  },
  {
    filename: "couple5.jpg",
    resizeDimensions: {
      height: 190,
      width: 190,
    },
    placement: {
      X: 450,
      Y: 15,
    },
  },
];

function getTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

module.exports = {
  name: "mingle",
  aliases: ["mgl"],
  description: "Mingle Someone Virtually Cuz They Can't Be In Real Life..",
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
    const template = getTemplate();
    let outputFilename = await doOverlay({
      target: template.filename,
      overlayUrl: user.displayAvatarURL({ extension: "png" }),
      resizeDimensions: template.resizeDimensions,
      placement: template.placement,
      assetsDir: "assets/",
      outputsDir: "outputs/",
    });

    const embed = new EmbedBuilder()
      .setTitle(`${user.username} Is Officially Mingle!`)
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

    reply.edit({ content: "Awww.." });
    fs.unlinkSync(`./outputs/${outputFilename}`);
  },
};
