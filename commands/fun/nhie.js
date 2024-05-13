const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const getNhie = require("../../core/nhie_logic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nhie")
    .setDescription("Never Have I Ever Did 69 (In Real Life)")
    .addUserOption((option) =>
      option.setName("target").setDescription("the target user")
    ),
  testOnly: true,
  async execute(interaction, client) {
    interaction.deferReply();
    const user = interaction.options.getUser("target") ?? interaction.user;
    let nhie = getNhie();

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username} Asked:`)
      .setDescription(`<@${user.id}>, ${nhie}`)
      .setColor(client.colors.RED)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
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

    try {
      await interaction.followUp({
        embeds: [embed],
        components: [buttonRow],
      });
    } catch (e) {
      await interaction.editReply({
        embeds: [embed],
        components: [buttonRow],
      });
    }

    const filter = (i) => i.user.id === user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      console.log("REALALLALALA!");
      if (i.user.id != user.id) {
        return i.reply({
          content: `Calm Down Bud, This Nhie is For <@${user.id}>`,
          ephemeral: true,
        });
      } else {
        let customId = i.customId;
        if (customId == "nhie_yes") {
          let newEmbed = embed.setFooter({
            text: `${interaction.user.username} Chose They Have Done This`,
          });
          await i.update({
            embeds: [newEmbed],
            components: [],
          });
          collector.stop("Nhie Answered!");
        } else if (customId == "nhie_no") {
          let newEmbed = embed.setFooter({
            text: `${interaction.user.username} Chose They Have Never Done This`,
          });
          await i.update({
            embeds: [newEmbed],
            components: [],
          });
          collector.stop("Nhie Answered!");
        }
      }
    });

    collector.on("end", (collected) => {
      if (collected.size == 0) {
        let newEmbed = embed.setFooter({
          text: `${user.username} Didn't Respond`,
        });
        interaction.editReply({
          embeds: [newEmbed],
          components: [],
        });
      }
    });
  },
};
