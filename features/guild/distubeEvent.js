const { Collection, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");

function secToTime(seconds, separator) {
  return [
    parseInt(seconds / 60 / 60),
    parseInt((seconds / 60) % 60),
    parseInt(seconds % 60),
  ]
    .join(separator ? separator : ":")
    .replace(/\b(\d)\b/g, "0$1")
    .replace(/^00\:/, "");
}

module.exports = {
  name: "distubeEvents",
  async execute(client) {
    client.distube
      .on("addSong", (queue, song) => {
        let channel = queue.textChannel;
        let embed = new EmbedBuilder()
          .setDescription(`Added **${song.name}** to the queue.`)
          .setColor("Purple")
          .setThumbnail(song.thumbnail)
          .setFooter({
            text: `Duration: ${song.formattedDuration}`,
          })
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        channel.send({
          embeds: [embed],
        });
      })
      .on("playSong", (queue, song) => {
        let channel = queue.textChannel;
        let embed = new EmbedBuilder()
          .setDescription(`Now Playing **${song.name}**.`)
          .setColor("Purple")
          .setThumbnail(song.thumbnail)
          .setFooter({
            text: `Duration: ${song.formattedDuration}`,
          })
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        channel.send({
          embeds: [embed],
        });
      })
      .on("addList", (queue, playlist) => {
        let channel = queue.textChannel;
        let embed = new EmbedBuilder()
          .setDescription(
            `Added **${playlist.songs.length} Songs** From **${playlist.name}** to the queue.`
          )
          .setColor("Purple")
          .setThumbnail(playlist.songs[0].thumbnail)
          .setFooter({
            text: `Duration: ${playlist.formattedDuration}`,
          })
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        channel.send({
          embeds: [embed],
        });
      })
      .on("searchNoResult", (queue, query) => {
        let embed = new EmbedBuilder()
          .setDescription(`No Results Found For **${query}**`)
          .setColor("Red")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        queue.textChannel.send({
          embeds: [embed],
        });
      })
      .on("empty", (queue) => {
        let embed = new EmbedBuilder()
          .setDescription(`The Voice Channel Is Empty.. leaving the channel...`)
          .setColor("Purple")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        queue.textChannel.send({
          embeds: [embed],
        });
      })
      .on("finish", (queue) => {
        let embed = new EmbedBuilder()
          .setDescription(`Finished The Queue.. leaving the channel...`)
          .setColor("Purple")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          });

        queue.textChannel.send({
          embeds: [embed],
        });
      });
  },
};
