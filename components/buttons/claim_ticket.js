const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const Ticket = require("../../schemas/Ticket");
const TicketSetup = require("../../schemas/TicketSetup");

module.exports = {
  data: {
    name: "claim_ticket",
  },
  async execute({ interaction, client }) {
    const { member, guild, channel } = interaction;

    let embed = new EmbedBuilder().setColor(client.colors.PRIMARY);

    let setup = await TicketSetup.findOne({
      guildId: guild.id,
    });

    if (!setup)
      return interaction.reply({
        content:
          "Something Is Really Wrong! PLEASE DELETE THIS CHANNEL FAST!!!!".toUpperCase(),
      });

    if (!member.roles.cache.find((r) => r.id == setup.handlers)) {
      embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `${client.emoji.yeetWrongStanding} You Cannot Use This!`
        );
      return interaction.reply({
        ephemeral: true,
        embeds: [embed],
      });
    }

    let result = await Ticket.findOne({
      channelId: channel.id,
    });

    if (!result) {
      return interaction.reply({
        ephemeral: true,
        embeds: [
          embed
            .setColor("Red")
            .setDescription(
              `${client.emoji.yeetWrongStanding} Something Went Wrong! Please Delete This Ticket Manually!`
            ),
        ],
      });
    }

    if (result.claimed === true) {
      return interaction.reply({
        ephemeral: true,
        embeds: [
          embed
            .setColor("Red")
            .setDescription(
              `${client.emoji.yeetWrongStanding} The Ticket Is Already Claimed By <@${result.claimedBy}>!`
            ),
        ],
      });
    }

    await Ticket.updateOne(
      {
        channelId: channel.id,
      },
      {
        claimed: true,
        claimedBy: member.id.toString(),
      }
    );

    return interaction.reply({
      //   ephemeral: true,
      embeds: [
        embed
          .setDescription(
            `${client.emoji.yeetRightStanding} | The Ticket Is Now Claimed By <@${member.id}>`
          )
          .setColor(client.colors.PRIMARY),
      ],
    });
  },
};
