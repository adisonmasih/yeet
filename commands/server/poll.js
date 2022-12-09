const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Your Opinion Matters!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("what is the question?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choices")
        .setDescription("what are the choices? (separated by a comma)")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    let choices = interaction.options
      .getString("choices")
      .replaceAll(/,\s/gm, ",")
      .split(",");
    let question = interaction.options.getString("question");

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
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      });

    let reply = await interaction.channel.send({
      embeds: [embed],
    });

    interaction.reply("Your Poll:");

    choices.map(async (choice, index) => {
      await reply.react(emojiNames[index + 1]);
    });
  },
};
