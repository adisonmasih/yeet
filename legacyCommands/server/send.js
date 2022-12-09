const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
const RoleMessage = require("../../schemas/RoleMessage");
const {
  fetchCache,
  addToCache,
  updateDirectCache,
} = require("../../features/guild/rr");

module.exports = {
  name: "send",
  aliases: ["snd"],
  description: "Sends A Message That Can Be Used For Setting Up Auto Roles",
  args: {
    required: [
      {
        name: "channel",
        type: "text",
      },
      {
        name: "text",
        type: "text",
      },
    ],
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
    let rolesChannel = await message.guild.channels.cache.get(channelId);
    args.shift();
    let text = args.join(" ");

    const { guild } = message;

    let sentMessage = await rolesChannel.send({
      content: text,
    });

    updateDirectCache(client, sentMessage, guild.id, {});

    await RoleMessage.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        guildId: guild.id,
        channelId: channelId,
        messageId: sentMessage.id,
        roles: [],
      },
      { upsert: true }
    );

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("✅ Message Sent")
      .setDescription(
        "Now Please Use The `addrole` Command To Add Roles To The Message"
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({
      embeds: [embed],
    });
  },
};
