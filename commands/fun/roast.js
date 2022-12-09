const { SlashCommandBuilder } = require("discord.js");
const getRoast = require("../../core/roast_logic");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Roast Someone Deadly As Hell!!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const message = `<@${user.id}>, ` + getRoast();
    interaction.reply({
      content: message,
    });
  },
};
