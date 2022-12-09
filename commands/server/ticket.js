const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Ticket = require("../../schemas/Ticket");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket Actions")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((option) =>
      option
        .setName("add")
        .setDescription("Add An Member To This Ticket")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("The Member To Add To This Ticket")
            .setRequired(true)
        )
    )
    .addSubcommand((option) =>
      option
        .setName("remove")
        .setDescription("Remove An Member From This Ticket")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("The Member To Remove From This Ticket")
            .setRequired(true)
        )
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

    const { options, guild, channel } = interaction;
    const channelId = channel.id;
    const guildId = guild.id;
    const subcommand = options.getSubcommand();
    const member = options.getMember("member");

    const embed = new EmbedBuilder().setColor(client.colors.PRIMARY);

    switch (subcommand) {
      case "add":
        {
          let result = await Ticket.findOne({
            channelId,
            guildId,
          });

          if (!result) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    `${client.emoji.yeetWrongStanding} No Ticket Is Associated With This Channel!`
                  ),
              ],
            });
          }

          if (result.members.includes(member.id)) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    `${client.emoji.yeetWrongStanding} This Member Is Already Added To This Ticket!`
                  ),
              ],
            });
          }

          result.members.push(member.id);

          await Ticket.updateOne({
            channelId,
            guildId,
            members: [...result.members],
          });

          await channel.permissionOverwrites.edit(member.id, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true,
          });

          return interaction.reply({
            embeds: [
              embed.setDescription(
                `${client.emoji.yeetRightStanding} | ${member} Is Added To This Ticket!`
              ),
            ],
          });
        }
        break;

      case "remove":
        {
          let result = await Ticket.findOne({
            channelId,
            guildId,
          });

          if (!result) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    `${client.emoji.yeetWrongStanding} No Ticket Is Associated With This Channel!`
                  ),
              ],
            });
          }

          if (!result.members.includes(member.id)) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    `${client.emoji.yeetWrongStanding} This Member Not Associated With This Ticket!`
                  ),
              ],
            });
          }

          result.members = result.members.filter((ix) => ix != member.id);

          await Ticket.updateOne({
            channelId,
            guildId,
            members: [...result.members],
          });

          await channel.permissionOverwrites.edit(member.id, {
            SendMessages: false,
            ViewChannel: false,
            ReadMessageHistory: false,
          });

          return interaction.reply({
            embeds: [
              embed.setDescription(
                `${client.emoji.yeetRightStanding} | ${member} Is Removed From This Ticket!`
              ),
            ],
          });
        }
        break;
    }
  },
};
