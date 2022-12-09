const { QueryType } = require("discord-player");
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("relatedsong")
    .setDescription("Adds A Related Song To The Queue"),
  name: "relatedsong",
  description: "Adds A Related Song To The Queue",
  aliases: ["rs"],
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
    const queue = client.distube.getQueue(message.member.voice.channel);

    if (!queue) {
      let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("There are no songs in the queue.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    let song = await queue.addRelatedSong(message.member.voice.channel);

    let embed = new EmbedBuilder()
      .setDescription(`Added **${song.name}** To The Queue`)
      .setColor("Purple")
      .setThumbnail(song.thumbnail)
      .setFooter({
        text: `Duration: ${song.formattedDuration}`,
      })
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({
      embeds: [embed],
    });
  },
};
