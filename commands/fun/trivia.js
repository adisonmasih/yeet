const {
  SlashCommandBuilder,
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
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("UR SO INTELLISEXEGENT BRO!!!!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mcq")
        .setDescription("MCQ Trivia!!")
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("You Are AN Expert In Some Field Right?")
            .setRequired(true)
            .addChoices(
              {
                name: "Any",
                value: "any",
              },
              {
                name: "Arts & Literature",
                value: "arts_and_literature",
              },
              {
                name: "Film & TV",
                value: "film_and_tv",
              },
              {
                name: "Food & Drink",
                value: "food_and_drink",
              },
              {
                name: "General Knowledge",
                value: "general_knowledge",
              },
              {
                name: "Geography",
                value: "geography",
              },
              {
                name: "History",
                value: "history",
              },
              {
                name: "Music",
                value: "music",
              },
              {
                name: "Science",
                value: "science",
              },
              {
                name: "Society & Culture",
                value: "society_and_culture",
              },
              {
                name: "Sport & Leisur",
                value: "sport_and_leisure",
              }
            )
        )
        .addStringOption((option) =>
          option
            .setRequired(true)
            .setName("difficulty")
            .setDescription("Geeks Gonna Choose 'Hard'!!!")
            .addChoices(
              {
                name: "Easy",
                value: "easy",
              },
              {
                name: "Medium",
                value: "medium",
              },
              {
                name: "Hard",
                value: "hard",
              }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("tf")
        .setDescription("TF is this")
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("My Man Gonna Go For The Hardest!!!")

            .setChoices(
              {
                name: "Any",
                value: "any",
              },
              {
                name: "Entertainment",
                value: "entertainment",
              },
              {
                name: "Sports",
                value: "sports",
              },
              {
                name: "Science",
                value: "science",
              },
              {
                name: "Animals",
                value: "animals",
              },
              {
                name: "General Knowledge",
                value: "General Knowledge",
              },
              {
                name: "Mythology",
                value: "mythology",
              },
              {
                name: "Politics",
                value: "politics",
              },
              {
                name: "Geography",
                value: "geography",
              },
              {
                name: "History",
                value: "history",
              }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("difficulty")
            .setDescription("BROOO GET HARDDD!!!")
            .setChoices(
              {
                name: "Easy",
                value: "easy",
              },
              {
                name: "Medium",
                value: "medium",
              },
              {
                name: "Hard",
                value: "hard",
              }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("riddle")
        .setDescription(
          "From The People Of 69's Land, We Present You The Best Riddles"
        )
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.user;
    let subcommand = interaction.options.getSubcommand() ?? "mcq";

    if (subcommand == "mcq") {
      let category = interaction.options.getString("category") ?? "any";
      let difficulty = interaction.options.getString("difficulty") ?? "easy";
      let url;
      if (category == "any") {
        url = `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`;
      } else {
        url = `https://the-trivia-api.com/api/questions?limit=1&category=${category}&difficulty=${difficulty}`;
      }

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
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
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

      await interaction.reply({
        embeds: [embed],
        components: [buttonRow],
      });

      const filter = (i) => i.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        let customId = i.customId;
        if (customId == correctAnswer) {
          let newEmbed = embed.setFooter({
            text: `✅ ${interaction.user.username} Chose The Correct Answer, ${correctAnswer}`,
            iconURL: interaction.user.displayAvatarURL(),
          });
          await interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        } else if (incorrectAnswers.includes(customId)) {
          let newEmbed = embed.setFooter({
            text: `❌ ${interaction.user.username} Chose The Wrong Answer, The Correct Answer Was ${correctAnswer}`,
            iconURL: interaction.user.displayAvatarURL(),
          });
          await interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });

      collector.on("end", (collected) => {
        if (collected.size == 0) {
          let newEmbed = embed.setFooter({
            text: `${user.username} Didn't Respond Under 60 Seconds, The Correct Answer Was ${correctAnswer}`,
            iconURL: user.displayAvatarURL(),
          });
          interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });
    } else if (subcommand == "tf") {
      let category = interaction.options.getString("category") ?? "any";
      let difficulty = interaction.options.getString("difficulty") ?? "easy";
      let url;
      if (category == "any") {
        url = `https://beta-trivia.bongo.best/?type=boolean&difficulty=${difficulty}`;
      } else {
        url = `https://beta-trivia.bongo.best/?type=boolean&difficulty=${difficulty}&category=${category}`;
      }

      let response = await fetch(url);
      let json = await response.json();
      let question = json[0];
      let correctAnswer = question.correct_answer.toLowerCase();

      const embed = new EmbedBuilder()
        .setTitle(`${he.decode(question.question)}`)
        .setDescription(`True False Go BRRRR!!!`)
        .setColor(client.colors.RED)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
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

      await interaction.reply({
        embeds: [embed],
        components: [buttonRow],
      });

      const filter = (i) => i.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        let customId = i.customId;
        if (customId == correctAnswer) {
          let newEmbed = embed.setFooter({
            text: `✅ ${interaction.user.username} Chose The Correct Answer, ${correctAnswer}`,
            iconURL: interaction.user.displayAvatarURL(),
          });
          await interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        } else if (customId != correctAnswer) {
          let newEmbed = embed.setFooter({
            text: `❌ ${interaction.user.username} Chose The Wrong Answer, The Correct Answer Was ${correctAnswer}`,
            iconURL: interaction.user.displayAvatarURL(),
          });
          await interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });

      collector.on("end", (collected) => {
        if (collected.size == 0) {
          let newEmbed = embed.setFooter({
            text: `${user.username} Didn't Respond Under 60 Seconds, The Correct Answer Was ${correctAnswer}`,
            iconURL: user.displayAvatarURL(),
          });
          interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });
    } else if (subcommand == "riddle") {
      let riddle = getRiddle();
      const embed = new EmbedBuilder()
        .setTitle(`${riddle.question}`)
        .setDescription(
          `Answer Would Be Automatically Shown After 60 Seconds :alarm_clock:`
        )
        .setColor(client.colors.RED)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });
      const button1 = new ButtonBuilder()
        .setCustomId("show_riddle_answer")
        .setLabel("SHOW ANSWER")
        .setStyle(ButtonStyle.Success);
      const buttonRow = new ActionRowBuilder().addComponents(button1);
      await interaction.reply({
        embeds: [embed],
        components: [buttonRow],
      });

      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "show_riddle_answer") {
          let newEmbed = embed.setDescription(`**Answer:** ${riddle.answer}`);
          await interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });

      collector.on("end", (collected) => {
        if (collected.size == 0) {
          let newEmbed = embed.setDescription(`**Answer:** ${riddle.answer}`);
          interaction.editReply({
            embeds: [newEmbed],
            components: [],
          });
        }
      });
    }
  },
};
