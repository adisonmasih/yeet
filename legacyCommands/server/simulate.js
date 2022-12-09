const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Welcome = require("../../schemas/Welcome");

const cache = new Map();

module.exports = {
  name: "simulate",
  aliases: ["smlt"],
  description: "Simulates A Fake Join..",

  async execute(message, args, client, mentions) {
    let member = message.member;
    // only members with administrator permision can run this command
    if (
      !message.member
        .permissionsIn(message.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ You Do Not Have Permission To Run This Command")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });
      return message.reply({
        embeds: [embed],
      });
    }

    await client.emit("guildMemberAdd", member);
  },
};
