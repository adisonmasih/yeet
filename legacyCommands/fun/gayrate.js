const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "gayrate",
  aliases: ["gayrt"],
  description: "Gay Rate Machine",
  args: {
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
    // separator: "__NO_SEPARATOR__",
  },
  async execute(message, args, client, mentions) {
    const target = mentions.size > 0 ? mentions.first() : message.author;
    let rate = Math.floor(Math.random() * 100);

    const embed = new EmbedBuilder()
      .setTitle(`Gay Rate Machine`)
      .setDescription(`<@${target.id}> Is **${rate}%** Gay`)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(target.displayAvatarURL())
      .setFooter({
        text: "Requested By " + message.author.username,
        iconURL: message.author.displayAvatarURL(),
      });

    message.reply({
      embeds: [embed],
    });
  },
};
