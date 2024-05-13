const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("thank")
        .setDescription("Thank someone for their help!")
        .addUserOption((option) =>
            option.setName("user").setDescription("Who's you wanna thank?").setRequired(true)
        ),
    testOnly: false,
    async execute(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user;

        // make sure these are generic and fit in any context
        const templates = [
            "Thank you, {user}!",
            "Thanks, {user}!",
            "I really appreciate it, {user}!",
            "You're the best, {user}!",
            "Thanks! You're a lifesaver, {user}!",
            "Thanks! You're awesome, {user}!",
            "Thanks! You're amazing, {user}!",
            "Thanks! You're the best, {user}!",

        ];

        const template = templates[Math.floor(Math.random() * templates.length)];

        const embed = new EmbedBuilder()
            .setDescription(template.replace("{user}", "<@" + user.id + ">"))
            .setColor("Random")
            .setFooter({
                text: "Requested by " + interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })

        interaction.reply({
            embeds: [embed],
        });
    },
};
