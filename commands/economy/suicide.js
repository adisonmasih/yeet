const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
const { DieAble } = require("../../core/die");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suicide")
    .setDescription(
      "Commit A Manual Sucide (Death), Resulting In Loss Of Balance, Inventory & More"
    ),
  testOnly: true,
  async execute(interaction, client) {
    let user = interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    const dieable = new DieAble({
      user,
      model: userData,
      client,
    });

    await dieable.die("committing suicide");

    const embed = new EmbedBuilder()
      .setDescription(`Check Your DMs`)
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });
    return interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
  },
};
