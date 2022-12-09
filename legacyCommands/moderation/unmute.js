const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  User,
} = require("discord.js");
const Punishment = require("../../schemas/Punishment");

module.exports = {
  name: "unmute",
  aliases: ["umt"],
  description: "Unmutes An User",
  args: {
    // separator: ", ",
    required: [
      {
        name: "user",
        type: "user",
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
        .has(PermissionFlagsBits.ModerateMembers)
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

    // args.shift();

    let user = mentions.first();

    try {
      const member = await message.guild.members.fetch(user.id);
      if (member) {
        await member.timeout(null, "none");
        // const mutedRole = message.guild.roles.cache.find(
        //   (role) => role.name == "Muted"
        // );
        // if (!mutedRole) {
        //   return message.reply({
        //     embeds: [
        //       embed
        //         .setTitle("No Muted Role Found")
        //         .setDescription(
        //           `This Server Does Not Have A \`Muted\` Role. Please Create A Role Named Exactly \`Muted\` And Setup The Appropriate Permissions.`
        //         ),
        //     ],
        //   });
        // }

        // member.roles.add(mutedRole);

        // await new Punishment({
        //   userId: user.id,
        //   guildId: message.guild.id,
        //   staffId: message.author.id,
        //   reason,
        //   expires,
        //   type: "mute",
        // }).save();
      }
    } catch (e) {
      return message.reply({
        embeds: [
          embed.setTitle("Error!").setDescription(`Cannot Unmute That User!`),
        ],
      });
    }
    return message.reply({
      embeds: [
        embed.setTitle("Yeet!").setDescription(`Unmuted **${user.tag}**`),
      ],
    });
  },
};
