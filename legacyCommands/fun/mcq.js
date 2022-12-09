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
  name: "mcq",
  aliases: ["mq"],
  description: "UR SO INTELLISEXEGENT BRO!!!!",
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
          `Correct Syntax: **yeet mcq <easy/medium/hard> [@user]**`
        )
        .setColor(client.colors.RED);
      message.reply({
        embeds: [embed],
      });
    }

    let url = `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`;
    let response = await fetch(url);
    let json = await response.json();
    let question = json[0];
    let answers = [];
    let incorrectAnswers = question.incorrectAnswers;
    let correctAnswer = question.correctAnswer;
    incorrectAnswers.forEach((answer) => answers.push(answer));
    answers.push(correctAnswer);

    answers = shuffle(answers);

    const embed = new EmbedBuilder()
      .setTitle(`${question.question}`)
      .setDescription(
        `\`A\` ${answers[0]}\n\`B\` ${answers[1]}\n\`C\` ${answers[2]}\n\`D\` ${answers[3]}`
      )
      .setColor(client.colors.RED)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      })
      .setFooter({
        text: "Requested By " + message.author.username,
        iconURL: message.author.displayAvatarURL(),
      });

    const button1 = new ButtonBuilder()
      .setCustomId(answers[0])
      .setLabel("A")
      .setStyle(ButtonStyle.Success);

    const button2 = new ButtonBuilder()
      .setCustomId(answers[1])
      .setLabel("B")
      .setStyle(ButtonStyle.Danger);

    const button3 = new ButtonBuilder()
      .setCustomId(answers[2])
      .setLabel("C")
      .setStyle(ButtonStyle.Primary);

    const button4 = new ButtonBuilder()
      .setCustomId(answers[3])
      .setLabel("D")
      .setStyle(ButtonStyle.Secondary);

    const buttonRow = new ActionRowBuilder().addComponents(
      button1,
      button2,
      button3,
      button4
    );

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
          content: `Bruh.. This Not For Ya.. Let <@${user.id}> Answer!`,
          ephemeral: true,
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
      } else if (incorrectAnswers.includes(customId)) {
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
