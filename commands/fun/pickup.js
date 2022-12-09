const { SlashCommandBuilder } = require('discord.js')
const getPickup = require('../../core/pickup_logic')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pickup')
        .setDescription('Well Now Forget All The Pickup Lines You\'ve Learned')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const message = `<@${user.id}>, ` + getPickup();
        interaction.reply({
            content: message,
        })
    }
}