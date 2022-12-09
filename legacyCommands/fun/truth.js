const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "truth",
  aliases: ["tr"],
  description: "Yeet Bot ❌ | Secret Revealing Bot ✅",
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
    let res = await fetch("https://truth-dare.tk/api/truth/");
    let resJSON = await res.json();
    let truth = resJSON.truth;

    let embed = new EmbedBuilder()
      .setTitle(`${message.author.username} Asked`)
      .setDescription(`<@${target.id}>, ${truth}`)
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
