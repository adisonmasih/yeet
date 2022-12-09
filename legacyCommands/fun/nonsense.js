const generateNonSense = require("../../logic.js");

module.exports = {
  name: "nonsense",
  aliases: ["ns"],
  description: "Generates a random nonsense sentence.",
  async execute(message, args, client) {
    message.reply({
      content: (await generateNonSense()).toString(),
    });
  },
};
