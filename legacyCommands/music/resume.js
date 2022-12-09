const { QueryType } = require("discord-player");
const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes The Music"),
  name: "resume",
  description: "Resumes The Music",
  aliases: ["resm"],

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

    queue.resume(message.member.voice.channel);

    let embed = new EmbedBuilder()
      .setTitle("Success")
      .setDescription("Resumed The Music!")
      .setColor("Purple")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return message.reply({
      embeds: [embed],
    });
  },
};
