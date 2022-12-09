const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const getNhie = require("../../core/nhie_logic");

module.exports = {
  name: "nhie",
  aliases: ["nh"],
  description: "Never Have You Ever Did 69 (In Real Life)",
  args: {
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let user = mentions.size > 0 ? mentions.first() : message.author;
    let nhie = getNhie();

    let embed = new EmbedBuilder()
      .setTitle(`${message.author.username} Asked:`)
      .setDescription(`<@${user.id}>, ${nhie}`)
      .setColor(client.colors.RED)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      });

    const yesButton = new ButtonBuilder()
      .setCustomId("nhie_yes")
      .setLabel("I Have")
      .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
      .setCustomId("nhie_no")
      .setLabel("I Have Never")
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder().addComponents(yesButton, noButton);

    let reply = await message.reply({
      embeds: [embed],
      components: [buttonRow],
    });

    const filter = (i) => true;
    // const filter = (i) => i.user.id === user.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id != user.id) {
        return i.reply({
          content: `Calm Down Bud, This Nhie is For <@${user.id}>`,
          ephemeral: true,
        });
      }
      let customId = i.customId;
      if (customId == "nhie_yes") {
        let newEmbed = embed.setFooter({
          text: `${user.username} Chose They Have Done This`,
        });
        await reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      } else if (customId == "nhie_no") {
        let newEmbed = embed.setFooter({
          text: `${user.username} Chose They Have Never Done This`,
        });
        await reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size == 0) {
        let newEmbed = embed.setFooter({
          text: `${user.username} Didn't Respond`,
        });
        reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });
  },
};
