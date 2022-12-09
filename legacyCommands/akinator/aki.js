const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");
const akinator = require("discord.js-akinator");

const language = "en"; // The Language of the Game
const childMode = false; // Whether to use Akinator's Child Mode
const gameType = "character"; // The Type of Akinator Game to Play. ("animal", "character" or "object")
const useButtons = true; // Whether to use Discord's Buttons
const embedColor = "Purple"; // The Color of the Message Embeds

module.exports = {
  name: "akinator",
  aliases: ["aki"],
  description: "Starts An Akinator Game :)",
  async execute(message, args, client, mentions) {
    akinator(message, {
      language: language, // Defaults to "en"
      childMode: childMode, // Defaults to "false"
      gameType: gameType, // Defaults to "character"
      useButtons: useButtons, // Defaults to "false"
      embedColor: embedColor, // Defaults to "Random"
    });
  },
};
