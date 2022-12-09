const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("accompany")
    .setDescription("Well Guess What? Yeet Will Accompany You!")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who To Agree With?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    let accompanies = [
      `Yes! <@${user.id}> is absolutely right!`,
      `<@${user.id}> Has Said An Universal Truth`,
      `Using My A.I, I Can Confirm That <@${user.id}> is Absolutely Right!`,
      `My Algorithm Has Confirmed That <@${user.id}> is Not Lying`,
      `Shut Up All! My Verdict Is That <@${user.id}> is Speaking Truth!`,
      `<@${user.id}> Was Right All Along!`,
    ];

    let accompany = accompanies[Math.floor(Math.random() * accompanies.length)];
    await interaction.reply({
      content: accompany,
    });
  },
};
