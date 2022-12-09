const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
var he = require("he");

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
  name: "truefalse",
  aliases: ["tf"],
  description: "Newton Impregnated His Sexy Maid? True Or False",
  args: {
    required: [
      {
        name: "difficulty",
        type: "text",
      },
    ],
    optional: [
      {
        name: "target",
        type: "user",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let user = mentions.size > 0 ? mentions.first() : message.author;
    let difficulty = args[0];
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      let embed = new EmbedBuilder()
        .setTitle("Invalid Difficulty!")
        .setDescription(
          `Correct Syntax: **yeet tf <easy/medium/hard> [@user]**`
        )
        .setColor(client.colors.RED);
      message.reply({
        embeds: [embed],
      });
    }

    let url = `https://beta-trivia.bongo.best/?type=boolean&difficulty=${difficulty}`;
    let response = await fetch(url);
    let json = await response.json();
    let question = json[0];
    let correctAnswer = question.correct_answer.toLowerCase();

    const embed = new EmbedBuilder()
      .setTitle(`${he.decode(question.question)}`)
      .setDescription(`True False Go BRRRR!!!`)
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
      .setCustomId("true")
      .setLabel("TRUE")
      .setStyle(ButtonStyle.Success);

    const button2 = new ButtonBuilder()
      .setCustomId("false")
      .setLabel("FALSE")
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder().addComponents(button1, button2);

    let reply = await message.reply({
      embeds: [embed],
      components: [buttonRow],
    });

    const filter = (i) => i.user.id == user.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    let isAnswered = false;

    collector.on("collect", async (i) => {
      if (i.user.id != user.id) {
        return i.reply({
          content: `Ahh Shit Here We Go Again! This Not For Ya! Let <@${user.id}> Answer!`,
        });
      }
      let customId = i.customId;
      if (customId == correctAnswer) {
        isAnswered = true;
        let newEmbed = embed.setFooter({
          text: `✅ ${user.username} Chose The Correct Answer, ${correctAnswer}`,
          iconURL: user.displayAvatarURL(),
        });
        await reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      } else if (customId != correctAnswer) {
        isAnswered = true;
        let newEmbed = embed.setFooter({
          text: `❌ ${user.username} Chose The Wrong Answer, The Correct Answer Was ${correctAnswer}`,
          iconURL: user.displayAvatarURL(),
        });
        await reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });

    collector.on("end", (collected) => {
      if (!isAnswered) {
        let newEmbed = embed.setFooter({
          text: `${user.username} Didn't Respond Under 60 Seconds, The Correct Answer Was ${correctAnswer}`,
          iconURL: user.displayAvatarURL(),
        });
        reply.edit({
          embeds: [newEmbed],
          components: [],
        });
      }
    });
  },
};
