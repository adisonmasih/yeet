const {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const Welcome = require("../../schemas/Welcome");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("Sets The Welcome Channel & Message")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Which Channel Do You Want To Send The Welcomes In?")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Type A Sweet Greeting Message!")
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
    let welcomeMessage = interaction.options.getString("message");

    const { guild } = interaction;
    const welcome = await Welcome.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channelId,
        message: welcomeMessage,
      },
      {
        upsert: true,
      }
    );

    client.custom.cache.channels.welcome.set(guild.id, {
      channelId: channelId,
      message: welcomeMessage,
    });

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription("✅ Welcome Message & Channel Has Been Set")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    interaction.reply({
      embeds: [embed],
    });
  },
};
