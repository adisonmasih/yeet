const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('You Like Dad Jokes? I See You Are A Man Of Culture'),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const message = ``
        let res = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: 'application/json'
            }
        })
        let resJSON = await res.json()
        let joke = resJSON.joke

        const embed = new EmbedBuilder()
            .setTitle(`A Dad Joke!`)
            .setDescription(joke)
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