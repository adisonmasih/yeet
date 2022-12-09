const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
var he = require("he");
const getRiddle = require("../../core/riddle");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

module.exports = {
  name: "riddle",
  aliases: ["rdl"],
  description: "From The People Of 69's Land, We Present You The Best Riddles",
  async execute(message, args, client, mentions) {
    let user = message.author;

    let riddle = getRiddle();
    const embed = new EmbedBuilder()
      .setTitle(`${riddle.question}`)
      .setDescription(
        `Answer Would Be Automatically Shown After 60 Seconds :alarm_clock:`
      )
      .setColor(client.colors.RED)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      })
      .setFooter({
        text: "Requested By " + user.username,
        iconURL: user.displayAvatarURL(),
      });
    const button1 = new ButtonBuilder()
      .setCustomId("show_riddle_answer")
      .setLabel("SHOW ANSWER")
      .setStyle(ButtonStyle.Success);
    const buttonRow = new ActionRowBuilder().addComponents(button1);
    let reply = await message.reply({
      embeds: [embed],
      components: [buttonRow],
    });

    const filter = (i) => i.user.id == user.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id != user.id) {
        return i.reply({
          content: `Well I Suppose You Are Not The One Who Summoned This Riddle ¯\\_(ツ)_//¯`,
        });
      }
      if (i.customId === "show_riddle_answer") {
        let newEmbed = embed.setDescription(`**Answer:** ${riddle.answer}`);
        await reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size == 0) {
        let newEmbed = embed.setDescription(`**Answer:** ${riddle.answer}`);
        reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });
  },
};
