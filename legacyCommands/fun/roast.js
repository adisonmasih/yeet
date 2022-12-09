const getRoast = require("../../core/roast_logic");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  aliases: ["ro"],
  description: "Roast Someone Deadly As Hell!!",
  args: {
    required: [
      {
        type: "user",
        name: "target",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let target = mentions.first();
    let roast = getRoast();

    const embed = new EmbedBuilder()
      .setTitle(`${target.username} Roasted!`)
      .setDescription(`<@${target.id}>, ${roast}`)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setColor(client.colors.PRIMARY);

    await message.reply({
      embeds: [embed],
    });
  },
};
