const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const {
  SearchResultPlaylist,
  SearchResultVideo,
  SearchResultType,
} = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("progress")
    .setDescription("Shows The Progress Of The Current Song"),
  name: "progress",
  description: "Shows The Progress Of The Current Song",
  aliases: ["prg"],
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
    if (!queue || !queue.songs[0]) {
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

    let song = queue.songs[0];
    let progressPerCent = Math.floor((queue.currentTime / song.duration) * 17);

    console.log(`PROGRESS: `, progressPerCent, "%");

    let bar = "";
    for (let i = 0; i < 17; i++) {
      if (i == progressPerCent) {
        bar += ":radio_button:";
      } else {
        bar += "━";
      }
    }

    let embed = new EmbedBuilder()

      .setDescription(`${song.name} - \`${song.formattedDuration}\`\n${bar}`)
      .setColor("Purple")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(song.thumbnail);

    return message.reply({
      embeds: [embed],
    });
  },
};
