const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
let emojis = [];
var request = require("request");
const http = require("http");
const urlExists = async (host) => {
  return await new Promise((resolve, reject) => {
    http
      .get(host, (res) => {
        resolve(res.statusCode < 400);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = {
  name: "addemoji",
  description: "Add an emoji to the server from emoji.gg",
  aliases: ["aemo"],
  args: {
    required: [
      {
        name: "emoji",
        type: "string",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    if (
      !message.member.permissions.has(
        PermissionFlagsBits.ManageEmojisAndStickers
      )
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Cannot Use This Command!")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }
    if (args[0].includes("e!add") && args[1]) {
      args[0] = args[1];
    }
    let emoteUrl = `http://cdn3.emoji.gg/emojis/${args[0]}.png`;
    let exists = await urlExists(emoteUrl);
    let isGif = false;
    if (!exists) {
      emoteUrl = `http://cdn3.emoji.gg/emojis/${args[0]}.gif`;
      exists = await urlExists(emoteUrl);
      if (!exists) {
        let embed = new EmbedBuilder()
          .setDescription(`❌ Please Enter A Valid Code From emoji.gg!`)
          .setColor("Red");

        return message.reply({
          embeds: [embed],
        });
      }
    }

    const nameRegex = new RegExp(/\d*[-,_](\D*[-,_,\D*]*?)/gm);
    const name = nameRegex.exec(args[0])[1].replaceAll("-", "_");

    const existingEmoji = await client.guilds.cache
      .get(message.guild.id)
      .emojis.cache.find((emoji) => emoji.name === name);
    if (existingEmoji) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `❌ The emoji **${name}** already exists on this server.`
        );

      return message.reply({
        embeds: [embed],
      });
    }

    let createdEmoji;
    try {
      createdEmoji = await message.guild.emojis.create({
        attachment: emoteUrl,
        name: name,
      });
    } catch (e) {
      console.log(e);

      let embed = new EmbedBuilder()

        .setColor("Red")
        .setDescription(
          `❌ The emoji **${name}'s** max heap size is too large for discord to upload.`
        );

      return message.reply({
        embeds: [embed],
      });
    }

    let embed = new EmbedBuilder()

      .setColor("Green")
      .setDescription(
        `<:${name}:${createdEmoji.id}> The emoji **${name}** has been added to this server.`
      );

    return message.reply({
      embeds: [embed],
    });
  },
};
