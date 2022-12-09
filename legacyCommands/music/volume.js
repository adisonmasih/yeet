const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const {
  SearchResultPlaylist,
  SearchResultVideo,
  SearchResultType,
} = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Set the volume of the music player.")
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("A Value Between 1 - 100")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),
  name: "volume",
  description: "Set the volume of the music player.",
  aliases: ["vol"],
  args: {
    required: [
      {
        name: "volume",
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
        .setDescription("Bruh.. Join My Voice Channel!")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    let queue = client.distube.getQueue(guild);
    if (!queue) {
      let embed = new EmbedBuilder()
        .setDescription("There is no music playing in this guild.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    client.distube.setVolume(message.member.voice.channel, parseInt(args[0]));

    let embed = new EmbedBuilder()
      .setDescription("Volume Set To **" + args[0] + "%**")
      .setColor("Green")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({
      embeds: [embed],
    });
  },
};
