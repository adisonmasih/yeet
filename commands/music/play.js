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
        .setDescription("I'm Already Playing Music In Another Voice Channel!")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }

    client.distube.play(
      interaction.member.voice.channel,
      interaction.options.getString("query"),
      {
        textChannel: interaction.channel,
        member: interaction.member,
      }
    );

    return interaction.reply({
      content: "Request Received!",
    });
  },
};
