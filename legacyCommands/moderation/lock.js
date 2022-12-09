const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  name: "lock",
  aliases: ["lck"],
  description: "Locks The Current Channel",
  async execute(message, args, client, mentions) {
    let embed = new EmbedBuilder()
      .setTitle(`This Channel is Locked`)
      .setDescription(
        "This Channel is now locked. You can't send messages in this channel."
      )
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

    try {
      await message.reply({
        embeds: [
          embed
            .setTitle("Locking Channel")
            .setDescription("Locking this channel..."),
        ],
      });

      message.channel.permissionOverwrites.edit(
        message.channel.guild.roles.everyone,
        { SendMessages: false }
      );
    } catch (e) {
      console.log("THIS CHANNEL IS ALREADY LOCKED!");
    }

    // message.channel.permissionOverwrites.set([
    //   {
    //     id: message.channel.guild.roles.everyone,
    //     deny: [PermissionsBitField.Flags.SendMessages],
    //   },
    //   {
    //     id: message.author.id,
    //     allow: [PermissionsBitField.Flags.SendMessages],
    //   },
    // ]);
  },
};
