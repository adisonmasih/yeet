const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
const MemberCountChannel = require("../../schemas/MemberCountChannel");

module.exports = {
  name: "addcountchannel",
  aliases: ["acnt"],
  description: "Sets Up A Channel For The Member, Bot, Total & Goal Count",
  args: {
    required: [
      {
        name: "type",
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

    let type = args.shift().toLowerCase().trim().replaceAll(",", "");
    console.log(`type: ${type}`);
    if (!["members", "bots", "total", "goal"].includes(type)) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          "❌ Invalid Type\n\nValid Types: members, bots, total, goal"
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }
    let text = args?.join(" ")?.trim() ?? "";

    const { guild } = message;

    let result = await MemberCountChannel.findOne({
      guildId: guild.id,
      countType: type,
    });

    let finalChannelId;

    let checkChannel =
      (await guild.channels.cache.get(result?.channelId)) ?? null;
    if (!checkChannel) result = null;

    let total = await guild.members.fetch({
      force: true,
    });
    let bots = total.filter((m) => m.user.bot).size;
    let users = total.filter((m) => !m.user.bot).size;
    console.log(`users: ${users} bots: ${bots}`);
    let newChannelCountValue = 0;
    switch (type) {
      case "members":
        newChannelCountValue = users;
        break;
      case "bots":
        newChannelCountValue = bots;
        break;
      case "total":
        newChannelCountValue = users + bots;
        break;
      default:
        break;
    }
    let newChannelName =
      type == "goal" ? text : text.replaceAll("$COUNT", newChannelCountValue);
    console.log("REACHED HERE " + newChannelName);

    if (!result) {
      let newChannel = await guild.channels.create({
        name: newChannelName,
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [
              PermissionFlagsBits.Connect,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.Speak,
              PermissionFlagsBits.RequestToSpeak,
              PermissionFlagsBits.Speak,
            ],
          },
        ],
      });
      console.log("NEW CHANNEL: ", newChannel);
      finalChannelId = newChannel.id;
    } else {
      await checkChannel.edit({
        name: newChannelName,
      });
      console.log(`Old Channel: ${checkChannel}`);

      finalChannelId = result.channelId;
    }

    console.log("REACHED BEFORE FINDONE AND UDPATE " + finalChannelId);

    await MemberCountChannel.findOneAndUpdate(
      {
        guildId: guild.id,
        countType: type,
      },
      {
        channelId: finalChannelId,
        content: text,
      },
      {
        upsert: true,
      }
    );

    console.log("SCRIPT REACHED AT THE END");

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(
        "✅ Successfully Added A Channel For The " +
          type.toUpperCase() +
          " Count"
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
