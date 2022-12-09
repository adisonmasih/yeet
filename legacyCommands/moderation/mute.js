const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  User,
} = require("discord.js");
const Punishment = require("../../schemas/Punishment");

module.exports = {
  name: "mute",
  aliases: ["shut"],
  description: "Mutes An User",
  args: {
    // separator: ", ",
    required: [
      {
        name: "user",
        type: "user",
      },
      {
        name: "duration",
        type: "text",
      },
    ],
    optional: [
      {
        name: "reason",
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
    let duration = args.shift();
    let reason = args.join(" ");

    let time = 0;
    let type;

    try {
      const split = duration.match(/\d+|\D+/g);
      time = parseInt(split[0]);
      type = split[1].toLowerCase();
    } catch (e) {
      return message.reply({
        embeds: [
          embed
            .setTitle("Invalid Format!")
            .setDescription(
              'Invalid Time Format! Example Format: "10d" where `d` = days, `h` = hours and `m` = minutes'
            ),
        ],
      });
    }

    if (type == "h") {
      time *= 3600000;
    } else if (type == "d") {
      time *= 86400000;
    } else if (type == "m") {
      time *= 60000;
    } else if (type != "m") {
      return message.reply({
        embeds: [
          embed
            .setTitle("Invalid Format!")
            .setDescription(
              "Please Use `m`, `h`, `d` for minutes, hours and days respectively."
            ),
        ],
      });
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + time);

    const result = await Punishment.findOne({
      guildId: message.guild.id,
      userId: user.id,
      type: "mute",
    });

    if (result) {
      return message.reply({
        embeds: [
          embed
            .setTitle("Already Muted")
            .setDescription(`<@${user.id}> Is already muted in this server!`),
        ],
      });
    }

    try {
      const member = await message.guild.members.fetch(user.id);
      if (member) {
        console.log(`time: ${time}ms`);
        await member.timeout(time, reason ?? "secret");
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
          embed.setTitle("Error!").setDescription(`Cannot Mute That User!`),
        ],
      });
    }

    if (reason.trim() == "") {
      reason = "Secret!";
    }

    return message.reply({
      embeds: [
        embed
          .setTitle("Yeet!")
          .setDescription(
            `Muted **${user.tag}**\n**Duration:** ${duration}\n**Reason**: ${
              reason == "" ? "Secret" : reason
            }`
          ),
      ],
    });
  },
};
