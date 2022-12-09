const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Ticket = require("../../schemas/Ticket");
const TicketSetup = require("../../schemas/TicketSetup");

module.exports = {
  data: {
    name: "ticket",
  },
  async execute({ interaction, client, category }) {
    console.log(`Ticket With Category: ${category}`);
    const { guild, member } = interaction;

    let result = await TicketSetup.findOne({
      guildId: guild.id,
    });

    if (!result) return;

    console.log(result.buttons, category);

    if (result.buttons.filter((b) => b.label === category).length == 0) return;

    const ticketId = Math.floor(
      Math.random() * 90000 * (1 / (Math.random() * 100)) + 100
    );

    let createdChannel = await guild.channels.create({
      name: `${category}-${ticketId}`,
      type: ChannelType.GuildText,
      parent: result.category,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: guild.members.me.id,
          allow: [
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: result.handlers,
          allow: [
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: result.everyoneId,
          deny: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    let ticket = new Ticket();
    ticket.guildId = guild.id;
    ticket.members = [member.id];
    ticket.channelId = createdChannel.id;
    ticket.ticketId = ticketId;
    ticket.type = category;
    ticket.claimed = false;

    await ticket.save();

    let embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name} | Ticket: #${ticketId} | Powered By YEET!`,
        iconURL: guild.iconURL({ dynamic: true }),
      })
      .setDescription(
        `Please Wait Patiently For A Response from the staff team.\nIn The Mean While, Briefly Describe Your Issue`
      )
      .setFooter({
        text: "The Buttons Below Are For The Staff Only.",
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("Save & Close Ticket")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("💾"),
      new ButtonBuilder()
        .setCustomId("lock_ticket")
        .setLabel("Lock")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🔒"),
      new ButtonBuilder()
        .setCustomId("unlock_ticket")
        .setLabel("Unlock")
        .setStyle(ButtonStyle.Success)
        .setEmoji("🔓"),
      new ButtonBuilder()
        .setCustomId("claim_ticket")
        .setLabel("Claim")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("👍")
    );

    await createdChannel.send({
      embeds: [embed],
      components: [row],
    });

    createdChannel
      .send({
        content: `${member} Here Is Your Ticket:`,
      })
      .then((m) => {
        setTimeout(() => m.delete().catch(console.log), 5000);
      });

    return interaction.reply({
      ephemeral: true,
      content: `${member} your ticket has been created: ${createdChannel}`,
    });
  },
};
