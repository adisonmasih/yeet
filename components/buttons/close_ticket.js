const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const Ticket = require("../../schemas/Ticket");
const TicketSetup = require("../../schemas/TicketSetup");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  data: {
    name: "close_ticket",
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

    await interaction.deferReply();

    let result = await Ticket.findOne({
      channelId: channel.id,
    });

    if (!result) {
      return interaction.editReply({
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

    if (result.closed === true) {
      return interaction.editReply({
        ephemeral: true,
        embeds: [
          embed
            .setColor("Red")
            .setDescription(
              `${client.emoji.yeetWrongStanding} The Ticket Is Already Closed!`
            ),
        ],
      });
    }

    await Ticket.updateOne(
      {
        channelId: channel.id,
      },
      {
        closed: true,
      }
    );

    for (const ticketMember of result.members) {
      await channel.permissionOverwrites.edit(ticketMember, {
        SendMessages: false,
      });
    }

    const attachment = await createTranscript(channel, {
      limit: -1,
      returnBuffer: false,
      filename: `${result.type}-${result.ticketId}.html`,
    });

    const raiser = await guild.members.cache.get(result.members[0]);
    let message = await guild.channels.cache
      .get(setup.transcriptsChannelId)
      .send({
        embeds: [
          embed
            .setDescription(
              `Transcript Type: **${result.type
                .split("_")
                .join(" ")
                .toUpperCase()}**\nTicket ID: **${result.ticketId}**`
            )
            .setColor(client.colors.PRIMARY)
            .setAuthor({
              name: raiser.user.tag,
              iconURL: raiser.user.displayAvatarURL({
                dynamic: true,
              }),
            }),
        ],
        files: [attachment],
      });

    await interaction.editReply({
      ephemeral: true,
      embeds: [
        embed
          .setDescription(
            `✅ | The Ticket Is Now Closed\nChannel Will Be Deleted In \`10 Seconds\`\nView [TRANSCRIPT](${message.url})`
          )
          .setColor(client.colors.PRIMARY),
      ],
    });

    setTimeout(async () => {
      await channel.delete();
      await Ticket.deleteOne({
        channelId: channel.id,
      });
    }, 10000);
  },
};
