const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("define")
        .setDescription("A Dictionary At your command")
        .addStringOption(option =>
            option.setName("word")
                .setDescription("The word you want to define")
                .setRequired(true)),

    testOnly: false,
    async execute(interaction, client) {
        const word = interaction.options.getString("word");

        await interaction.deferReply();

        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        let embed = new EmbedBuilder()

        if (res.status === 404) {
            embed.setTitle("Word Not Found")
                .setDescription("The word you are looking for is not found in the dictionary")
                .setColor("Red")
        }

        if (res.status === 200) {
            const json = await res.json()
            let { word, meanings } = json[0]

            const firstMeaning = meanings[0].definitions[0].definition

            embed.setTitle(word)
                .setDescription(firstMeaning)
                .setColor("Random")
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp()

        }



        interaction.editReply({
            embeds: [embed],
        });
    },
};
