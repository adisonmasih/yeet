const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
const JoinToCreate = require("../../schemas/JoinToCreate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registertempvoice")
    .setDescription("Sets Up The 'Join To Create' Channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription('The "Join To Create" Channel')
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription(
          "This Role Will Be Assigned To The User Who Creates A Temp Voice Channel"
        )
    ),
  async execute(interaction, client) {
    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `${client.emoji.yeetWrongStanding} You Do Not Have Permission To Run This Command`
        )
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return interaction.reply({
        embeds: [embed],
      });
    }

    let channel =
      interaction.options.getChannel("channel") || member?.voice?.channel;
    let role = interaction.options.getRole("role")?.id || "none";

    const { guild } = interaction.member;

    await JoinToCreate.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        channelId: channel.id,
        role: role,
      },
      {
        upsert: true,
      }
    );

    let embed = new EmbedBuilder()
      .setColor(client.colors.GREY)
      .setDescription(
        `${client.emoji.yeetRightStanding} Join To Create Setup Successfull!`
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
