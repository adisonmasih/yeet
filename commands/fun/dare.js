const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dare")
        .setDescription("Yeet Bot ❌ | Ass Kicking Bot ✅")
        .addUserOption((option) =>
            option.setName("target").setDescription("the target user")
        ).addStringOption(
            option => option.setName("rating").setDescription("The rating of the dare").addChoices({
                name: "PG",
                value: "pg"
            }, {
                name: "PG-13",
                value: "pg13"
            }, {
                name: "R",
                value: "r"

            })
        ),
    testOnly: true,
    async execute(interaction, client) {
        const user = interaction.options.getUser("target") || interaction.user;
        const rating = interaction.options.getString("rating") || "pg";
        const message = ``;


        let res = await fetch(`https://api.truthordarebot.xyz/v1/dare?rating=${rating}`)
        let resJSON = await res.json();
        let truth = resJSON?.question ?? "Something went wrong? try this command again";

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} Dared:`)
            .setDescription(`<@${user.id}>, ${truth}`)
            .setColor(client.colors.RED)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });

        interaction.reply({
            embeds: [embed],
        });
    },
};
