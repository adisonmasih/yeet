const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "fact",
  aliases: ["fct"],
  description: "Get a random fact",
  async execute(message, args, client, mentions) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c016dad0fcmshac400032bc5979fp1093a5jsn71e324e0bc69",
        "X-RapidAPI-Host": "random-facts2.p.rapidapi.com",
      },
    };

    let res = await fetch(
      `https://random-facts2.p.rapidapi.com/getfact`,
      options
    );
    let json = await res.json();
    let fact = json.Fact;

    let embed = new EmbedBuilder()
      .setTitle(`A Random Fact`)
      .setDescription(fact)
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
