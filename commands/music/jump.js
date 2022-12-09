const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const {
  SearchResultPlaylist,
  SearchResultVideo,
  SearchResultType,
} = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Jump to a specific song in the queue")
    .addNumberOption((option) =>
      option
        .setName("track")
        .setDescription(
          "The track number to skip to. Eg: 1,2,3 For Next Tracks Or -1,-2,-3 For Previous Tracks"
        )
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

    // interaction.deferReply();

    let replied = false;

    client.distube
      .jump(guild, interaction.options.getNumber("track"))
      .catch(async (err) => {
        replied = true;
        await interaction.channel.send("Invalid Track No!");
      });

    return interaction.reply("...");
  },
};
