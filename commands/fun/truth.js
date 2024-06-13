const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("truth")
    .setDescription("Yeet Bot ❌ | Secret Revealing Bot ✅")
    .addUserOption((option) =>
      option.setName("target").setDescription("the target user")
    ).addStringOption(
      option => option.setName("rating").setDescription("The rating of the truth").addChoice("PG", "pg").addChoice("PG-13", "pg13").addChoice("R", "r").setRequired(false)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("target") || interaction.user;
    const message = ``;


    let res = await fetch("https://api.truthordarebot.xyz/v1/truth?rating=pg13")
    let resJSON = await res.json();
    let truth = resJSON?.question ?? "Something went wrong? try this command again";

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username} Asked:`)
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
