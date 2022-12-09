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

    const { guild, member, channel } = interaction;

    if (
      guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== guild.members.me.voice.channelId
    ) {
      let embed = new EmbedBuilder()
        .setDescription("Bruh.. Join My Voice Channel!")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
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

      return interaction.reply({
        embeds: [embed],
      });
    }

    client.distube.setVolume(
      interaction.member.voice.channel,
      interaction.options.getNumber("volume")
    );

    let embed = new EmbedBuilder()
      .setDescription(
        "Volume Set To " + interaction.options.getNumber("volume")
      )
      .setColor("Green")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
