const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "accompany",
  aliases: ["acm"],
  description: "No One Accompanies You? Yeet Will!",
  args: {
    optional: [
      {
        name: "user",
        type: "user",
      },
    ],
    // separator: "__NO_SEPARATOR__",
  },
  async execute(message, args, client, mentions) {
    const user = mentions.size > 0 ? mentions.first() : message.author;
    let accompanies = [
      `Yes! <@${user.id}> is absolutely right!`,
      `<@${user.id}> Has Said An Universal Truth`,
      `Using My A.I, I Can Confirm That <@${user.id}> is Absolutely Right!`,
      `My Algorithm Has Confirmed That <@${user.id}> is Not Lying`,
      `Shut Up All! My Verdict Is That <@${user.id}> is Speaking Truth!`,
      `<@${user.id}> Was Right All Along!`,
    ];

    let accompany = accompanies[Math.floor(Math.random() * accompanies.length)];
    await message.channel.send({
      content: accompany,
    });
    message.delete();
  },
};
