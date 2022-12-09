const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insult')
        .setDescription('Insult someone If you don\'t Have the BALLS In Real Life')
        .addUserOption(option => option.setName('target').setDescription('The Person To Roast!').setRequired(true)),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const message = ``
        let res = await fetch("https://insult.mattbas.org/api/insult")
        let insult = await res.text()
        insult = JSON.parse(JSON.stringify(insult))
        const embed = new EmbedBuilder()
            .setTitle(`${user.username} You Are Insulted!`)
            .setDescription(`<@${user.id}>, ${insult}`)
            .setColor(client.colors.RED)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });

        interaction.reply({
            embeds: [embed]
        })
    }
}