const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("Are You Sure?")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("What do you want to spam?")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("times")
        .setDescription("How many times do you want to spam?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const text = interaction.options.getString("text") || "";
    const times = interaction.options.getNumber("times") || 10;
    interaction.reply({
      content: text,
    });
    let interval = setInterval(async () => {
      await interaction.channel.send({
        content: text,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, times * 1000);
  },
};
