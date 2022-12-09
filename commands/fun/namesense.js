const { SlashCommandBuilder } = require('discord.js')
const generateNameNonSense = require('../../core/namesense')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('namesense')
        .setDescription('Generates a random nonsense sentence about someone')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const message = generateNameNonSense(user.username);
        interaction.reply({
            content: message,
        })
    }
}