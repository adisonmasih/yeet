const getPreviousBirth = require("../../core/prevbirth_logic");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "prevbirth",
  aliases: ["pb"],
  description: "Finds Out What Were Someone In Their Previous Life",
  args: {
    optional: [
      {
        type: "user",
        name: "target",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let target = mentions.size > 0 ? mentions.first() : message.author;
    const birth = getPreviousBirth();
    const embed = new EmbedBuilder()
      .setTitle(`${target.username}'s Previous Birth`)
      .setThumbnail(target.displayAvatarURL())
      .setDescription(
        `**${target.username}** Was A **${birth}** In Their Previous Birth`
      )
      .setColor(client.colors.PRIMARY)
      .setFooter({ text: `Calculated Using Totally Real AI` })
      .setAuthor({
        name: target.username,
        iconURL: target.displayAvatarURL(),
      });

    message.reply({
      embeds: [embed],
    });
  },
};
