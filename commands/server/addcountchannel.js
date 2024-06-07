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
  data: new SlashCommandBuilder()
    .setName("addcountchannel")
    .setDescription("Sets Up A Channel For The Member, Bot, Total & Goal Count")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The Type Of Count Channel")
        .setChoices(
          {
            name: "Members Count",
            value: "members",
          },
          {
            name: "Bot Count",
            value: "bots",
          },
          {
            name: "Total Users Count",
            value: "total",
          },
          {
            name: "Members Goal",
            value: "goal",
          }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription(
          "The Text To Display In The Channel. Add $COUNT To Be Replaced With The Actual Count"
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return interaction.reply({
        embeds: [embed],
      });
    }

    let type = interaction.options
      .getString("type")
      .toLowerCase()
      .trim()
      .replaceAll(",", "");
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
      return interaction.reply({
        embeds: [embed],
      });
    }
    let text = interaction.options.getString("text");

    await interaction.reply({
      content:
        "Discord API Rate Limits Bots To Change The Channel Name Only 2 Times Every 10 Minutes. If This Message Does Not Get Edited.. Do Not Worry, It Just Means That The Bot Is Not Able To Change The Channel Name Currently But It Will Automatically Be Updated After 10 Minutes. And Remember, Do NOT DELETE This MESSAGE Or Else Your SERVER Will Explode!",
    });

    const { guild } = interaction.member;

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
        newChannelCountValue = users;
    }
    let newChannelName =
      text.replaceAll("$COUNT", newChannelCountValue);
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

    return interaction.editReply({
      content: "",
      embeds: [embed],
    });
  },
};
