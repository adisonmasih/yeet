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
  name: "jump",
  description: "Jump to a specific song in the queue",
  aliases: ["jmp"],
  args: {
    required: [
      {
        name: "track",
        type: "string",
      },
    ],
  },
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
    if (!queue) {
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

    // message.deferReply();

    let replied = false;

    client.distube.jump(guild, parseInt(args[0])).catch(async (err) => {
      replied = true;
      await message.channel.send("Invalid Track No!");
    });

    return message.reply("...");
  },
};
