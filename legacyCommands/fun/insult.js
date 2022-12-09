const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "insult",
  aliases: ["i"],
  description: "Insult someone If you don't Have the BALLS In Real Life",
  args: {
    required: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let target = mentions.first();
    let res = await fetch("https://insult.mattbas.org/api/insult");
    let insult = await res.text();
    insult = JSON.parse(JSON.stringify(insult));

    let embed = new EmbedBuilder()
      .setTitle(`${target.username} You Are Insulted!`)
      .setDescription(`<@${target.id}>, ${insult}`)
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
