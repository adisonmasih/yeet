const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "8ball",
  aliases: ["8b"],
  description: "Ask the magic 8ball a question.",
  args: {
    required: [
      {
        name: "question",
        type: "text",
      },
    ],
    // separator: "__NO_SEPARATOR__",
  },
  async execute(message, args, client, mentions) {
    let question = args.join(" ");
    let res = await fetch(`https://8ball.delegator.com/magic/JSON/${question}`);
    let json = await res.json();
    let answer = json.magic.answer;

    let embed = new EmbedBuilder()
      .setTitle(`🎱 ${question}`)
      .setDescription(answer)
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
