const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("yomomma")
    .setDescription(
      "Yo mamma is so fat when I said release the Kraken, your mom came"
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("Who's Mom?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    interaction.deferReply();
    const user = interaction.options.getUser("target") || interaction.user;
    let res = await fetch(`https://api.yomomma.info/`);
    let json = await res.json();
    let joke = json.joke;

    let embed = new EmbedBuilder()
      .setTitle("Yo Momma Joke!!")
      .setDescription(`<@${user.id}>, ${joke}`)
      .setColor(client.colors.RED)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Requested By: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.editReply({
      embeds: [embed],
    });
  },
};
