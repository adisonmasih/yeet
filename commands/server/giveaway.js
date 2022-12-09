const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
  Client,
  CommandInteraction,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("A Yeet Giveaway Manager!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("start")
        .setDescription("Start An Giveaway!")
        .addStringOption((option) =>
          option
            .setName("duration")
            .setDescription("The Duration Of The Giveaway (1m, 1h, 1d, 1w)")
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("winner_count")
            .setDescription("How Many Members Can Win This Giveaway?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("prize")
            .setDescription("The Grand Prize")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Which Channel Do You Want To Host This In?")
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("end")
        .setDescription("End The Giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Giveaway ID Displayed In The Giveaway Embed")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("pause")
        .setDescription("Pause The Giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Giveaway ID Displayed In The Giveaway Embed")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("resume")
        .setDescription("Resume The Giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Giveaway ID Displayed In The Giveaway Embed")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reroll")
        .setDescription("Reroll The Giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Giveaway ID Displayed In The Giveaway Embed")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Delete The Giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("The Giveaway ID Displayed In The Giveaway Embed")
            .setRequired(true)
        )
    ),
  testOnly: true,
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const subcommand = options.getSubcommand();

    let errorEmbed = new EmbedBuilder().setColor("Red").setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL(),
    });

    let successEmbed = new EmbedBuilder()
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    switch (subcommand) {
      case "start":
        {
          const gChannel = options.getChannel("channel") || interaction.channel;
          const duration = options.getString("duration") || "1h";
          const winnerCount = options.getNumber("winner_count");
          const prize = options.getString("prize");

          client.giveawaysManager
            .start(gChannel, {
              duration: ms(duration),
              winnerCount,
              prize,
              messages: {
                winMessage:
                  "'Congratulations, {winners}! You won **{this.prize}**!",
              },
            })
            .then(async () => {
              await interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Started!`
                  ),
                ],
              });
            })
            .catch(async () => {
              interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;

      case "end":
        {
          let messageId = options.getString("message_id");
          let giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageId
          );
          if (!giveaway) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                errorEmbed.setDescription(
                  `${client.emoji.yeetWrongStanding} Unable To Find That Giveaway!`
                ),
              ],
            });
          }

          client.giveawaysManager
            .end(messageId)
            .then(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Ended!`
                  ),
                ],
              });
            })
            .catch(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;

      case "pause":
        {
          let messageId = options.getString("message_id");
          let giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageId
          );
          if (!giveaway) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                errorEmbed.setDescription(
                  `${client.emoji.yeetWrongStanding} Unable To Find That Giveaway!`
                ),
              ],
            });
            break;
          }

          client.giveawaysManager
            .pause(messageId)
            .then(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Paused!`
                  ),
                ],
              });
            })
            .catch(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;

      case "resume":
        {
          let messageId = options.getString("message_id");
          let giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageId
          );
          if (!giveaway) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                errorEmbed.setDescription(
                  `${client.emoji.yeetWrongStanding} Unable To Find That Giveaway!`
                ),
              ],
            });
            break;
          }

          client.giveawaysManager
            .unpause(messageId)
            .then(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Resumed!`
                  ),
                ],
              });
            })
            .catch(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;

      case "reroll":
        {
          let messageId = options.getString("message_id");
          let giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageId
          );
          if (!giveaway) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                errorEmbed.setDescription(
                  `${client.emoji.yeetWrongStanding} Unable To Find That Giveaway!`
                ),
              ],
            });
          }

          client.giveawaysManager
            .reroll(messageId)
            .then(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Rerolled!`
                  ),
                ],
              });
            })
            .catch(async (e) => {
              console.log(e);
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;

      case "delete":
        {
          let messageId = options.getString("message_id");
          let giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageId
          );
          if (!giveaway) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                errorEmbed.setDescription(
                  `${client.emoji.yeetWrongStanding} Unable To Find That Giveaway!`
                ),
              ],
            });
            break;
          }

          client.giveawaysManager
            .delete(messageId)
            .then(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  successEmbed.setDescription(
                    `${client.emoji.yeetRightStanding} Giveaway Has Been Deleted!`
                  ),
                ],
              });
            })
            .catch(async () => {
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  errorEmbed.setDescription(
                    `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Try Again Later!`
                  ),
                ],
              });
            });
        }
        break;
    }
  },
};
