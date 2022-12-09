const generateNameSense = require("../../core/namesense");

module.exports = {
  name: "namesense",
  aliases: ["nms"],
  description: "Generates a random nonsense sentence about a particular user.",
  args: {
    required: [
      {
        type: "user",
        name: "target",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    console.log(args);
    message.reply({
      content: generateNameSense(mentions.first().username),
    });
  },
};
