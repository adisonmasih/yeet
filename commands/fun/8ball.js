const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("BROOO MAGIC BROOO!!!!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Any Question (Maybe Your Future Girlfriend's Name?)")
        .setRequired(true)
    ),
  testOnly: true,
  async execute(interaction, client) {
    const question = interaction.options.getString("question");
    let res = await fetch(`https://8ball.delegator.com/magic/JSON/${question}`);
    let json = await res.json();
    let answer = json.magic.answer;

    let embed = new EmbedBuilder()
      .setTitle(question + "?")
      .setDescription(answer)
      .setColor(client.colors.GREEN)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Requested By: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({
      embeds: [embed],
    });
  },
};
