const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelFlags,
  ChannelType,
  PermissionsBitField,
  PermissionFlagsBits,
  PermissionOverwriteManager,
  PermissionOverwrites,
  VoiceState,
  SnowflakeUtil,
} = require("discord.js");
const moongose = require("mongoose");
const JoinToCreate = require("../../schemas/JoinToCreate");
module.exports = {
  name: "voiceStateUpdate",
  /**
   *
   * @param {VoiceState} oldState
   * @param {VoiceState} newState
   */
  async execute(oldState, newState, client) {
    const { member, guild } = newState;

    const JTC = await JoinToCreate.findOne({
      guildId: guild?.id,
    });

    const joinToCreate = JTC?.channelId;
    const oldChannel = oldState?.channel;
    const newChannel = newState?.channel;

    if (!JTC) {
      return;
    }

    if (
      oldChannel != newChannel &&
      newChannel &&
      newChannel.id == joinToCreate
    ) {
      const voiceChannel = await guild.channels.create({
        name: member.user.tag,
        type: ChannelType.GuildVoice,
        parent: newChannel.parent,
        permissionOverwrites: [
          {
            id: member.id,
            allow: [PermissionFlagsBits.Connect],
          },
          {
            id: client.user.id,
            allow: [PermissionFlagsBits.Connect],
          },
          {
            id: guild.id,
            deny: [PermissionFlagsBits.Connect],
          },
        ],
      });

      client.voiceGenerator.set(member.id, voiceChannel.id);
      await newChannel.permissionOverwrites.edit(member, {
        Connect: false,
      });
      setTimeout(
        async () => await newChannel.permissionOverwrites.delete(member),
        30 * 1000
      );

      return setTimeout(async () => {
        await member.voice.setChannel(voiceChannel, 0.5 * 1000);
        if (JTC.role != "none") {
          const role = guild.roles.cache.get(JTC.role);
          await member.roles.add(role);
        }
      });
    }

    const ownedChannel = client.voiceGenerator.get(member.id);

    if (
      ownedChannel &&
      oldChannel.id == ownedChannel &&
      (!newChannel || newChannel.id != ownedChannel)
    ) {
      client.voiceGenerator.set(member.id, null);
      await oldChannel.delete().catch(console.log);
      if (JTC.role != "none") {
        const role = guild.roles.cache.get(JTC.role);
        await member.roles.remove(role);
      }
    }
  },
};
