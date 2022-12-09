const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  aliases: ["pl"],
  description: "Example Format: yeet poll Do You Like This?, YES, NO, IDK",
  args: {
    required: [
      {
        name: "question",
        type: "text",
      },
      {
        name: "choices",
        type: "text",
      },
    ],
    // separator: ", ",
  },
  async execute(message, args, client, mentions) {
    let split = message.content.replaceAll(/,\s/gm, ",").split(",");
    let question = split.shift().replaceAll("yeet poll", "");
    let choices = split;

    let emojiNames = {
      1: "1️⃣",
      2: "2️⃣",
      3: "3️⃣",
      4: "4️⃣",
      5: "5️⃣",
      6: "6️⃣",
      7: "7️⃣",
      8: "8️⃣",
      9: "9️⃣",
      10: "🔟",
    };

    let desc = await new Promise((resolve, reject) => {
      let str = "";
      choices.map((choice, index) => {
        str += `${emojiNames[index + 1]} ${choice}\n\n`;
      });
      resolve(str);
    });

    let embed = new EmbedBuilder()
      .setTitle(`${question ?? "No Question Specified"}`)
      .setDescription(desc)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.member.displayAvatarURL(),
      });

    let reply = await message.channel.send({
      embeds: [embed],
    });

    choices.map(async (choice, index) => {
      await reply.react(emojiNames[index + 1]);
    });
  },
};
