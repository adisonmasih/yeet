const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')
const getPreviousBirth = require('../../core/prevbirth_logic')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('prevbirth')
        .setDescription('Finds Out What Were Someone In Their Previous Life')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(false)),
    testOnly: true,
    async execute(interaction, client) {
        let user = interaction.options.getUser('target') || interaction.user;

        const birth = getPreviousBirth();
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Previous Birth`)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`**${user.username}** Was A **${birth}** In Their Previous Birth`)
            .setFooter({ text: `Calculated Using Totally Real AI` })
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })

        interaction.reply({
            embeds: [embed]
        })
    }
}