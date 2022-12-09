const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const { getDestroyMeme, getDestroyCaption } = require('../../core/destroy')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('destroy')
        .setDescription('You Like Destruction? This Will Make You See One!')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        let destruction = getDestroyCaption()
            .replaceAll('$', user.username)
            .replaceAll('@', interaction.user.username)
        let memeUrl = getDestroyMeme()

        const embed = new EmbedBuilder()
            .setTitle(destruction)
            .setImage(memeUrl)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setColor(client.colors.RED)

        await interaction.reply({
            embeds: [embed],
        })
    }
}