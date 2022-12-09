const { QueryType } = require("discord-player");
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),

  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      let embed = new EmbedBuilder()

        .setDescription("You must be in a voice channel to use this command.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }
    const queue = client.distube.getQueue(interaction.member.voice.channel);

    if (!queue) {
      let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("There are no songs in the queue.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }

    if (queue.songs.length < 2) {
      let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("There is only one song in the queue.")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }

    queue.skip(interaction.member.voice.channel);

    let embed = new EmbedBuilder()
      .setTitle("Success")
      .setDescription("The Current Song Has Been Skipped!")
      .setColor("Purple")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
