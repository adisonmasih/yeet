const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe({ language: "en", commandOptionName: "user" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Play TicTacToe With A.I Or A Real User!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who Do You Wanna Play With?")
        .setRequired(false)
    ),
  testOnly: true,
  async execute(interaction, client) {
    game.handleInteraction(interaction);
  },
};
