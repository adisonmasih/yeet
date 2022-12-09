const { SlashCommandBuilder } = require("discord.js");
const figlet = require("figlet");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("figlet")
    .setDescription(
      "You Know When The Text Is Displayed With Lines And Symbols And It Looks Cool"
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Some Text (Maybe UR Crush's Name?)")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const text = interaction.options.getString("text");
    const figletText = figlet.textSync(text);

    interaction.reply({
      content: `\`\`\`${figletText}\`\`\``,
    });
  },
};
