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

        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        let embed = new EmbedBuilder()

        if (res.status === 404) {
            embed.setTitle("Word Not Found")
                .setDescription("The word you are looking for is not found in the dictionary")
                .setColor("RED")
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

            meanings.forEach(meaning => {
                const { partOfSpeech, definitions } = meaning

                embed.addField({
                    name: partOfSpeech,
                    value: definitions.map((def, i) => {
                        return `**${i + 1}.** ${def.definition}\n*Example:* ${def.example ? def.example : "No Example"}`
                    }).join("\n\n")
                })
            })
        }





        interaction.reply({
            embeds: [embed],
        });
    },
};
