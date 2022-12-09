const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "dare",
  aliases: ["dr"],
  description:
    "Who Doesn't Like Dares? Every Does! (unless they have to do it)",
  args: {
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let reply = await message.reply({
      content: "Please Wait... :magic_wand:",
    });
    let target = mentions.size > 0 ? mentions.first() : message.author;
    let res = await fetch("https://truth-dare.tk/api/dare/");
    let resJSON = await res.json();
    let truth = resJSON.dare;

    let embed = new EmbedBuilder()
      .setTitle(`${message.author.username} Dared`)
      .setDescription(`<@${target.id}>, ${truth}`)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.member.displayAvatarURL(),
      });

    await reply.edit({
      content: "",
      embeds: [embed],
    });
  },
};
