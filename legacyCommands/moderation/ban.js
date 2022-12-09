const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  User,
} = require("discord.js");
const Punishment = require("../../schemas/Punishment");

module.exports = {
  name: "ban",
  aliases: ["boycott"],
  description: "Bans An User",
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
        .has(PermissionFlagsBits.BanMembers)
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

    let time;
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
      time *= 60;
    } else if (type == "d") {
      time *= 60 * 24;
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
      type: "ban",
    });

    if (result) {
      return message.reply({
        embeds: [
          embed
            .setTitle("Already Banned")
            .setDescription(`<@${user.id}> Is already banned in this server!`),
        ],
      });
    }

    try {
      const member = await message.guild.members.fetch(user.id);
      if (member) {
        await message.guild.members.ban(user.id, { days: 7, reason });

        await new Punishment({
          userId: user.id,
          guildId: message.guild.id,
          staffId: message.author.id,
          reason,
          expires,
          type: "ban",
        }).save();
      }
    } catch (e) {
      console.log(e);
      return message.reply({
        embeds: [
          embed.setTitle("Error!").setDescription(`Cannot Ban That User!`),
        ],
      });
    }

    return message.reply({
      embeds: [
        embed
          .setTitle("Yeet!")
          .setDescription(
            `Banned **${user.tag}**\n**Duration:** ${duration}\n**Reason**: ${
              reason == "" ? "Secret" : reason
            }`
          ),
      ],
    });
  },
};
