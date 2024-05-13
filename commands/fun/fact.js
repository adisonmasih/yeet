const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("fact")
        .setDescription("A Random Fact"),
    testOnly: false,
    async execute(interaction, client) {
        const res = await fetch("https://api.api-ninjas.com/v1/facts", {
            headers: {
                "X-Api-Key": process.env.NINJA_API_KEY
            }
        })
        const json = await res.json()

        const fact = json[0].fact


        const embed = new EmbedBuilder()
            .setTitle("Random Fact")
            .setDescription(fact)
            .setColor("Random")
            .setFooter({
                text: "Powered by Api Ninjas",
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp()



        interaction.reply({
            embeds: [embed],
        });
    },
};
