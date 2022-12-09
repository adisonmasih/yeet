const getPickup = require("../../core/pickup_logic");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pickup",
  aliases: ["pick"],
  description: "Well Now Forget All The Pickup Lines You've Learned",
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
    let embed = new EmbedBuilder()
      .setTitle(`${target.username} ❤️❤️`)
      .setDescription(`<@${target.id}>, ${getPickup()}`)
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
