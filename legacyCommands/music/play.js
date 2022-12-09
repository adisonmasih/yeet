const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const {
  SearchResultPlaylist,
  SearchResultVideo,
  SearchResultType,
} = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play some music you nerd!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("A Link To A Video, Playlist Or Just A Search Query")
        .setRequired(true)
    ),
  name: "play",
  description: "Play some music you nerd!",
  aliases: ["ply", "srch"],
  args: {
    required: [
      {
        name: "query",
        type: "string",
      },
    ],
  },

  async execute(message, args, client, mentions) {
    if (!message.member.voice.channel) {
      let embed = new EmbedBuilder()
        .setDescription("You must be in a voice channel to use this command.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    const { guild, member, channel } = message;

    if (
      guild.members.me.voice.channelId &&
      message.member.voice.channelId !== guild.members.me.voice.channelId
    ) {
      let embed = new EmbedBuilder()
        .setDescription("I'm Already Playing Music In Another Voice Channel!")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    client.distube.play(message.member.voice.channel, args.join(" "), {
      textChannel: message.channel,
      member: message.member,
    });

    return message.reply({
      content: "Request Received!",
    });
  },
};
