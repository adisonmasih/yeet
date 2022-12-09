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
    name: "lock_ticket",
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

    if (result.locked === true) {
      return interaction.reply({
        ephemeral: true,
        embeds: [
          embed
            .setColor("Red")
            .setDescription(
              `${client.emoji.yeetWrongStanding} The Ticket Is Already Locked!`
            ),
        ],
      });
    }

    await Ticket.updateOne(
      {
        channelId: channel.id,
      },
      {
        locked: true,
      }
    );

    for (const ticketMember of result.members) {
      await channel.permissionOverwrites.edit(ticketMember, {
        SendMessages: false,
      });
    }

    return interaction.reply({
      ephemeral: true,
      embeds: [
        embed
          .setDescription(`🔒 | The Ticket Is Now Locked`)
          .setColor(client.colors.PRIMARY),
      ],
    });
  },
};
