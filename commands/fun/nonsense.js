const { SlashCommandBuilder } = require('discord.js')
const generateNonSense = require('../../logic.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('nonsense')
    .setDescription('Generates a random nonsense sentence'),
  testOnly: true,
  async execute(interaction, client) {
    const message = await generateNonSense();
    interaction.reply({
      content: message,
    })
  }
}