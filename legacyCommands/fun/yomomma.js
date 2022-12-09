const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "yomomma",
  aliases: ["mom"],
  description:
    'Yo mamma so fat when she walked across the street, someone said,"Hey, the wooly mammoths are back!!',
  args: {
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let target = mentions.size > 0 ? mentions.first() : message.author;
    let res = await fetch(`https://api.yomomma.info/`);
    let json = await res.json();
    let joke = json.joke;

    let embed = new EmbedBuilder()
      .setTitle(`Yomomma Joke!`)
      .setDescription(`<@${target.id}>, ${joke}`)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.member.displayAvatarURL(),
      });

    await message.reply({
      embeds: [embed],
    });
  },
};
