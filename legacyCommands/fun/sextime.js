const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "sextime",
  aliases: ["sxtm"],
  description: "Sex Time Machine",
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

    if (target.id === "974598781913923594") rate = 100;

    const embed = new EmbedBuilder()
      .setTitle(`SexTime Machine`)
      .setDescription(
        `<@${target.id}> Lasts **${Math.random() < 0.5 ? "Less" : "Long"
        }** Than **${rate}%** Of The Men`
      )
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
