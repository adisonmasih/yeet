const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  CommandInteraction,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
const JoinToCreate = require("../../schemas/JoinToCreate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tempvoice")
    .setDescription("Tweak Your Temp Voice Channel 🔥🔥🔥")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("invite")
        .setDescription("Invite Someone To Your Temp Voice Channel!")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Who Do You Want To Invite?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("disallow")
        .setDescription("Remove Someone's Access To The Channel")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Who Do You Want To Take away access from?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("name")
        .setDescription("Change The Name Of Your Temp Voice Channel")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("A Hot Spicy Name 🔥🔥🔥")
            .setMinLength(1)
            .setMaxLength(22)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("public")
        .setDescription("Make Your Temp Voice Channel Public Or Private")
        .addStringOption((option) =>
          option
            .setName("choice")
            .setDescription("On / Off?")
            .setRequired(true)
            .addChoices(
              {
                name: "On",
                value: "on",
              },
              {
                name: "Off",
                value: "off",
              }
            )
        )
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, member, guild } = interaction;

    const subcommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const ownedChannel = client.voiceGenerator.get(member.id);

    const embed = new EmbedBuilder().setColor(client.colors.GREY).setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL(),
    });

    interaction.deferReply();
    interaction.deferred = true;

    if (!voiceChannel) {
      return interaction.deferred
        ? interaction.editReply({
            embeds: [
              embed.setDescription(
                `${client.emoji.yeetWrongStanding} You Are Not In A Voice Channel Dumbass..`
              ),
            ],
          })
        : null;
    }

    if (!ownedChannel || voiceChannel.id != ownedChannel) {
      return interaction.deferred
        ? interaction.editReply({
            embeds: [
              embed.setDescription(
                `${client.emoji.yeetWrongStanding} Bruh.. You Do Not Own This, Or Any Other Temp Voice Channel!`
              ),
            ],
          })
        : null;
    }

    switch (subcommand) {
      case "name":
        {
          newName = options.getString("name") || member.tag;
          await voiceChannel.edit({
            name: newName,
          });
          if (interaction.deferred) {
            interaction.editReply({
              ephemeral: true,
              embeds: [
                embed.setDescription(
                  `${client.emoji.yeetRightStanding} Changed The Temp Voice Channel Name To: **${newName}**`
                ),
              ],
            });
          } else {
            interaction.reply({
              ephemeral: true,
              embeds: [
                embed.setDescription(
                  `${client.emoji.yeetRightStanding} Changed The Temp Voice Channel Name To: **${newName}**`
                ),
              ],
            });
          }
        }
        break;

      case "invite":
        {
          const targetMember = options.getUser("user");
          await voiceChannel.permissionOverwrites.edit(targetMember, {
            Connect: true,
          });
          try {
            await targetMember.send({
              embeds: [
                embed.setDescription(
                  `<@${targetMember.id}> Has Invited You To <#${voiceChannel.id}> In **${guild.name}**`
                ),
              ],
            });
            if (interaction.deferred) {
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} <@${targetMember.id}> Has Been Invited To <#${voiceChannel.id}>`
                  ),
                ],
              });
            } else {
              interaction.reply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} <@${targetMember.id}> Has Been Invited To <#${voiceChannel.id}>`
                  ),
                ],
              });
            }
          } catch (e) {
            if (interaction.deferred) {
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetWrongStanding} Cannot Invite <@${targetMember.id}> For They Have DMs Closed`
                  ),
                ],
              });
            } else {
              interaction.reply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetWrongStanding} Cannot Invite <@${targetMember.id}> For They Have DMs Closed`
                  ),
                ],
              });
            }
          }
        }
        break;

      case "disallow":
        {
          const targetMember = options.getMember("user");
          await voiceChannel.permissionOverwrites.edit(targetMember, {
            Connect: false,
          });
          if (
            targetMember.voice.channel &&
            targetMember.voice.channel.id == voiceChannel.id
          )
            await targetMember.voice.setChannel(null);

          if (interaction.deferred) {
            interaction.editReply({
              ephemeral: true,
              embeds: [
                embed.setDescription(
                  `${client.emoji.yeetRightStanding} Removed <@${targetMember.id}>'s Access From <#${voiceChannel.id}>`
                ),
              ],
            });
          } else {
            interaction.reply({
              ephemeral: true,
              embeds: [
                embed.setDescription(
                  `${client.emoji.yeetRightStanding} Removed <@${targetMember.id}>'s Access From <#${voiceChannel.id}>`
                ),
              ],
            });
          }
        }
        break;

      case "public":
        {
          const choice = options.getString("choice");

          if (choice == "on") {
            await voiceChannel.permissionOverwrites.edit(guild.id, {
              Connect: null,
            });

            if (interaction.deferred) {
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} The Channel <#${voiceChannel.id}> Is Now Public`
                  ),
                ],
              });
            } else {
              interaction.reply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} The Channel <#${voiceChannel.id}> Is Now Public`
                  ),
                ],
              });
            }
          } else {
            await voiceChannel.permissionOverwrites.edit(guild.id, {
              Connect: false,
            });

            if (interaction.deferred) {
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} The Channel <#${voiceChannel.id}> Is Now Private`
                  ),
                ],
              });
            } else {
              interaction.reply({
                ephemeral: true,
                embeds: [
                  embed.setDescription(
                    `${client.emoji.yeetRightStanding} The Channel <#${voiceChannel.id}> Is Now Private`
                  ),
                ],
              });
            }
          }
        }
        break;
    }
  },
};
