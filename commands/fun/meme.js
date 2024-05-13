const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Summon a random meme"),
    testOnly: false,
    async execute(interaction, client) {
        const res = await fetch("https://meme-api.com/gimme")
        const json = await res.json()

        const { postLink, subreddit, title, url, nsfw, spoiler, author, ups, preview } = json

        const lastImage = preview[preview.length - 1]

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setURL(postLink)
            .setImage(url)
            .setFooter(`👍 ${ups} | Author: ${author} | Subreddit: r/${subreddit}`)
            .setColor("RANDOM")
            .setTimestamp()

        interaction.reply({
            embeds: [embed],
        });
    },
};