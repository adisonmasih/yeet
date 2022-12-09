const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const Welcome = require("../../schemas/Welcome");
const Leave = require("../../schemas/Leave");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setleave")
    .setDescription("Sets The Leave Channel & Message")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "Which Channel Do You Want To Send The Leave Messages In?"
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Type A FLAMING Hatred Message!")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return interaction.reply({
        embeds: [embed],
      });
    }

    let channelId = interaction.options.getChannel("channel").id;
    let leaveMessage = interaction.options.getString("message");

    const { guild } = interaction;
    const leave = await Leave.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channelId,
        message: leaveMessage,
      },
      {
        upsert: true,
      }
    );

    client.custom.cache.channels.leave.set(guild.id, {
      channelId: channelId,
      message: leaveMessage,
    });

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription("✅ Leave Message & Channel Has Been Set")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    interaction.reply({
      embeds: [embed],
    });
  },
};
