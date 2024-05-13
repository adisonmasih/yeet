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
            const { word, phonetics, meanings } = json[0]

            const { text, audio } = phonetics[0]

            embed.setTitle(word)
                .setDescription(text)
                .setColor("Random")
                .setFooter({
                    text: "Powered by DictionaryAPI",
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp()

            meanings = [meanings[0]]

            let embedFields = []

            meanings.forEach(meaning => {
                const { partOfSpeech, definitions } = meaning

                let definitionList = []

                definitions.forEach((definition, index) => {
                    const { definition: def, example, synonyms } = definition

                    let synonymsList = synonyms ? synonyms.join(", ") : "None"

                    definitionList.push(`**${index + 1}.** ${def}\n**Example:** ${example || "None"}\n**Synonyms:** ${synonymsList}`)
                })

                // make sure its not more than 1024 characters

                if (definitionList.join("\n\n").length > 1024) {
                    definitionList[definitionList.length - 1] = definitionList[definitionList.length - 1].slice(0, 1020) + "..."
                }

                embedFields.push({
                    name: partOfSpeech,
                    value: definitionList.join("\n\n"),
                })
            })

            embed.addFields(embedFields)
        }



        interaction.editReply({
            embeds: [embed],
        });
    },
};
