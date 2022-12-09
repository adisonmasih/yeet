const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("truth")
    .setDescription("Yeet Bot ❌ | Secret Revealing Bot ✅")
    .addUserOption((option) =>
      option.setName("target").setDescription("the target user")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser("target") || interaction.user;
    const message = ``;
    /*let res = await fetch("https://randommer.io/truth-dare-generator", {
	method: "POST",
	body: {
	  type: "truth",
	  category: "dirty"
	},
    });
*/
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("category", "dirty");
urlencoded.append("type", "truth");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

    let res = await fetch("https://randommer.io/truth-dare-generator", requestOptions)
    let resJSON = await res.json();
    let truth = resJSON.text;

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
