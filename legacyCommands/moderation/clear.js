const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  name: "clear",
  aliases: ["clr"],
  description: "Clears Some Shit Out",
  args: {
    required: [
      {
        name: "count",
        type: "text",
      },
    ],
  },
  async execute(message, args, client, mentions) {
    let embed = new EmbedBuilder()
      .setTitle(`DEFAULT`)
      .setDescription("DEFAULT")
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.member.displayAvatarURL(),
      });

    if (
      !message.member
        .permissionsIn(message.channel)
        .has(PermissionFlagsBits.Administrator)
    ) {
      return message.reply({
        embeds: [
          embed
            .setTitle("Insufficient Permissions")
            .setDescription(
              "You do not have the required permissions to use this command."
            ),
        ],
      });
    }

    let count = parseInt(args[0]);
    if (typeof count !== "number" || count <= 0 || count > 100) {
      return message.reply({
        embeds: [
          embed
            .setTitle("Invalid Count")
            .setDescription(
              "Please Enter a valid number less than 100 and greater than 1"
            ),
        ],
      });
    }

    try {
      const { size } = await message.channel.bulkDelete(count, true);
      return message.channel.send({
        embeds: [
          embed
            .setTitle("Yeet Purge!")
            .setDescription(`Deleted ${size} message(s)!`),
        ],
      });
    } catch (e) {
      console.log(e);
      return message.channel.send({
        embeds: [
          embed
            .setTitle("Something Went Wrong!")
            .setDescription("Buggy Buggy Snuggy Snuggy!"),
        ],
      });
    }
  },
};
