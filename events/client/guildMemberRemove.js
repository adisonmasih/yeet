// guildMemberAdd
const Canvas = require("@napi-rs/canvas");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelFlags,
  ChannelType,
  PermissionsBitField,
  PermissionFlagsBits,
  PermissionOverwriteManager,
  PermissionOverwrites,
  AttachmentBuilder,
} = require("discord.js");
const path = require("path");
const moongose = require("mongoose");
const Punishment = require("../../schemas/Punishment");
const Leave = require("../../schemas/Leave");
const Jimp = require("jimp");
const fs = require("fs");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    console.log("FROM EVENT: guildMemberRemove");
    require("../../manuals/guild/updateCountChannels")(member, client);

    const guild = member.guild;
    const dels = client.custom.helpers.getLeaveDetails(guild.id);
    console.log(dels);
    if (!dels) {
      return;
    }
    let channelId = client.custom.helpers.getLeaveDetails(guild.id).channelId;
    let leaveMessage = client.custom.helpers.getLeaveDetails(guild.id).message;
    const channel = await guild.channels.cache.get(channelId);
    if (!channel) return;
    if (channel.type !== ChannelType.GuildText) return;
    if (
      !channel
        .permissionsFor(guild.members.me)
        .has(PermissionFlagsBits.SendMessages)
    )
      return;
    if (
      !channel
        .permissionsFor(guild.members.me)
        .has(PermissionFlagsBits.EmbedLinks)
    )
      return;
    if (
      !channel
        .permissionsFor(guild.members.me)
        .has(PermissionFlagsBits.AttachFiles)
    )
      return;

    const user = member.user;
    const userTag = user.tag;
    const userId = user.id;

    let leaveText = leaveMessage
      .replaceAll("$NAME", member.displayName)
      .replaceAll("$GUILDNAME", guild.name)
      .replaceAll("$TAG", member.user.tag)
      .replaceAll("$PING", `<@${member.user.id}>`);

    await channel.send({
      content: leaveText,
    });

    // end update channel count
  },
};
