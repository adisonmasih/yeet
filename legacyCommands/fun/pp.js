const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ppsize",
  aliases: ["pp"],
  description: "PP Rate Machine",
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


    let length = Math.floor(Math.random() * 30);
    let str = "8";

    if (target.id === "974598781913923594") length = 30;

    for (let i = 0; i < length; i++) {
      str += "=";
    }

    str += "D";

    const embed = new EmbedBuilder()
      .setTitle(`PP Rate Machine`)
      .setDescription(`<@${target.id}>'s Penis\n${str}`)
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
