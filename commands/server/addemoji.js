const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
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
  data: new SlashCommandBuilder()
    .setName("addemoji")
    .setDescription("Add an emoji to the server from emoji.gg")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The Emoji Code From emoji.gg")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    interaction.deferReply();

    if (
      !interaction.member.permissions.has(
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
      return interaction.followUp({
        embeds: [embed],
      });
    }
    let code = interaction.options.getString("code");
    if (code.includes("e!add ")) {
      code = code.replaceAll("e!add ", "");
    }

    if (code.includes("/add emoji:")) {
      code = code.replaceAll("/add emoji:", "");
    }



    let emoteUrl = `http://cdn3.emoji.gg/emojis/${code}.png`;
    let exists = await urlExists(emoteUrl);
    let isGif = false;
    if (!exists) {
      emoteUrl = `http://cdn3.emoji.gg/emojis/${code}.gif`;
      exists = await urlExists(emoteUrl);
      if (!exists) {
        let embed = new EmbedBuilder()
          .setDescription(`❌ Please Enter A Valid Code From emoji.gg!`)
          .setColor("Red");

        return interaction.followUp({
          embeds: [embed],
        });
      }
    }

    const nameRegex = new RegExp(/\d*[-,_](\D*[-,_,\D*]*?)/gm);
    const name = nameRegex.exec(code)[1].replaceAll("-", "_");

    const existingEmoji = await client.guilds.cache
      .get(interaction.guild.id)
      .emojis.cache.find((emoji) => emoji.name === name);
    if (existingEmoji) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `❌ The emoji **${name}** already exists on this server.`
        );

      return interaction.followUp({
        embeds: [embed],
      });
    }

    let createdEmoji;
    try {
      createdEmoji = await interaction.guild.emojis.create({
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

      return interaction.followUp({
        embeds: [embed],
      });
    }
    let embed = new EmbedBuilder()

      .setColor("Green")
      .setDescription(
        `<:${name}:${createdEmoji.id}> The emoji **${name}** has been added to this server.`
      );

    return interaction.followUp({
      embeds: [embed],
    });
  },
};
