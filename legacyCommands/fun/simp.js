const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "simprate",
  aliases: ["smprt"],
  description: "Simp Rate Machine",
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

    if (target.id === "974598781913923594") rate = 0;

    const embed = new EmbedBuilder()
      .setTitle(`Simp Rate Machine`)
      .setDescription(`<@${target.id}> Is **${rate}%** Simp`)
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
