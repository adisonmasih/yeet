const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "dadjoke",
  aliases: ["dad"],
  description: "You Like Dad Jokes? I See You Are A Man Of Culture",
  async execute(message, args, client, mentions) {
    let res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let resJSON = await res.json();
    let joke = resJSON.joke;

    let embed = new EmbedBuilder()
      .setTitle("Dad Joke")
      .setDescription(joke)
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
