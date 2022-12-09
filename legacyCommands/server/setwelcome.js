const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Welcome = require("../../schemas/Welcome");

module.exports = {
  name: "setwelcome",
  aliases: ["sw"],
  description: "Welcoming Is Always Cool.. It Shows Authenticity",
  args: {
    required: [
      {
        name: "channel",
        type: "text",
      },
      {
        name: "message",
        type: "text",
      },
    ],
    // separator: ", ",
  },
  async execute(message, args, client, mentions) {
    if (
      !message.member
        .permissionsIn(message.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }
    const rgx = new RegExp(/<#(\d*)>/gim);
    let channelMentions = message.mentions.channels;

    if (channelMentions.size === 0) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ Please Mention A Valid Channel")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    let channelId = message.mentions.channels.first().id;
    args.shift();
    let welcomeMessage = args?.join(" ")?.trim() ?? "";

    const { guild } = message;
    const welcome = await Welcome.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channelId,
        message: welcomeMessage,
      },
      {
        upsert: true,
      }
    );

    client.custom.cache.channels.welcome.set(guild.id, {
      channelId: channelId,
      message: welcomeMessage,
    });

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription("✅ Welcome Message & Channel Has Been Set")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    message.reply({
      embeds: [embed],
    });
  },
};
