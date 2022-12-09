const { QueryType } = require("discord-player");
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Displays The Current Queue")
    .addNumberOption((option) =>
      option
        .setName("page")
        .setDescription("The Page Number To View")
        .setRequired(false)
        .setMinValue(1)
    ),
  async execute(interaction, client) {
    let pageno = interaction.options.getNumber("page") || 1;
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
    const queue = await client.distube.getQueue(
      interaction.member.voice.channel
    );
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

    const totalPages = Math.ceil(queue.songs.length / 10) || 1;
    const page = pageno - 1;

    if (pageno > totalPages) {
      let embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(`Invalid Page! There Are Only ${totalPages} Pages!`)
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }

    const queueString = queue.songs
      .slice(page * 10, page * 10 + 10)
      .map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.formattedDuration}]\` ${
          song.name
        } -- <@${song.member.id}>`;
      })
      .join("\n");

    const currentSong = queue.songs[0];

    const embed = new EmbedBuilder()
      .setTitle("Song Queue")
      .setDescription(
        `**Currently Playing**\n` +
          (currentSong
            ? `\`[${currentSong.formattedDuration}]\` ${currentSong.name} -- <@${currentSong.member.id}>`
            : "None") +
          `\n\n**Queue**\n${queueString}`
      )
      .setColor("Purple")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Page ${page + 1} of ${totalPages}`,
      })
      .setThumbnail(currentSong.thumbnail);

    interaction.reply({
      embeds: [embed],
    });
  },
};
