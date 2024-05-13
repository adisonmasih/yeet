const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
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
            .setFooter({
                text: `👍 ${ups} | Author: ${author} | Subreddit: r/${subreddit}`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor("Random")
            .setTimestamp()

        const button = new ButtonBuilder()
            .setStyle("Link")
            .setLabel("View on Reddit")
            .setURL(postLink)


        interaction.reply({
            embeds: [embed],
            buttons: [button],
        });
    },
};
