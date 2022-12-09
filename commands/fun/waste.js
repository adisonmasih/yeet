const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const getWasted = require('../../core/wasted_logic')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('waste')
        .setDescription('Why Wait To Trash Out Waste?')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        let memeUrl = getWasted()

        const embed = new EmbedBuilder()
            .setTitle(`${user.username} Was Wasted!`)
            .setImage(memeUrl)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setColor(client.colors.RED)

        await interaction.reply({
            embeds: [embed],
        })
    }
}