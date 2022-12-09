// guildMemberAdd
const Canvas = require("@napi-rs/canvas");
const { GlobalFonts } = Canvas;
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
const Welcome = require("../../schemas/Welcome");
const Jimp = require("jimp");
const fs = require("fs");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    console.log("FROM EVENT: guildMemberAdd");
    require("../../manuals/guild/updateCountChannels")(member, client);

    const guild = member.guild;
    const dels = client.custom.helpers.getWelcomeDetails(guild.id);
    if (!dels) {
      return;
    }
    let channelId = client.custom.helpers.getWelcomeDetails(guild.id).channelId;
    let welcomeMessage = client.custom.helpers.getWelcomeDetails(
      guild.id
    ).message;
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
    const userAvatar = user.displayAvatarURL({
      extension: "png",
      dynamic: true,
      size: 256,
    });

    let randomName = Math.random() * 4893840929842 + ".png";

    const jimpImg = await Jimp.read(userAvatar);
    jimpImg.circle();
    await jimpImg.write(`./outputs/${jimpImg}`);

    GlobalFonts.registerFromPath("./fonts/segoeui.ttf", "Segoe UI");

    const canvas = Canvas.createCanvas(700, 300);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./assets/welcome.png");

    let x = 0;
    let y = 0;

    ctx.drawImage(background, x, y, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(`./outputs/${jimpImg}`);

    x = canvas.width / 2 - 150 / 2;
    y = canvas.height / 2 - 150 / 2 - 50;

    ctx.drawImage(avatar, x, y, 150, 150);

    ctx.font = "30px Segoe UI";
    ctx.fillStyle = "#ffffff";
    let welcomeText = welcomeMessage
      .replaceAll("$NAME", member.displayName)
      .replaceAll("$GUILDNAME", guild.name)
      .replaceAll("$TAG", member.user.tag)
      .replaceAll("$PING", `<@${member.user.id}>`);
    let imgText = `${member.user.tag} Just Hopped In!`;
    x = canvas.width / 2 - ctx.measureText(imgText).width / 2;
    ctx.fillText(imgText, x, 210);

    ctx.font = "35px Segoe UI";
    let memberText = `Member #${guild.memberCount}`;
    x = canvas.width / 2 - ctx.measureText(memberText).width / 2;
    ctx.fillText(memberText, x, 260);

    const attachment = new AttachmentBuilder(await canvas.encode("png"), {
      name: "welcome.png",
    });

    await channel.send({
      content: welcomeText,
      files: [attachment],
    });

    fs.unlinkSync(`./outputs/${jimpImg}`);

    // end welcome

    const result = Punishment.findOne({
      guildId: member.guild.id,
      userId: member.id,
      type: "mute",
    });

    if (result) {
      const mutedRole = member.guild.roles.cache.find(
        (role) => role.name == "Muted"
      );
      if (mutedRole) {
        member.roles.add(mutedRole);
      }
    }

    // end update channel count
  },
};
