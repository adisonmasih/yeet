const { QueryType } = require("discord-player");
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles The Queue"),

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

    queue.shuffle(interaction.member.voice.channel);

    let embed = new EmbedBuilder()
      .setDescription("Shuffled The Queue")
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
