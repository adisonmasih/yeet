const {
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder,
  User,
} = require("discord.js");
const Punishment = require("../../schemas/Punishment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("He Irritate Duh")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("WHO Irritatin' YA!!!? BAN DAT SHIT!!!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription(
          'Example Format: "10d" where `d` = days, `h` = hours and `m` = minutes'
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription('Defaults To "Secret"')
    ),
  testOnly: true,
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle(`DEFAULT`)
      .setDescription("DEFAULT")
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      });

    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(PermissionFlagsBits.BanMembers)
    ) {
      return interaction.reply({
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

    let user = interaction.options.getUser("user");
    let duration = interaction.options.getString("duration");
    let reason = interaction.options.getString("reason") || "Secret";

    let time;
    let type;

    try {
      const split = duration.match(/\d+|\D+/g);
      time = parseInt(split[0]);
      type = split[1].toLowerCase();
    } catch (e) {
      return interaction.reply({
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
      return interaction.reply({
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
      guildId: interaction.guild.id,
      userId: user.id,
      type: "ban",
    });

    if (result) {
      return interaction.reply({
        embeds: [
          embed
            .setTitle("Already Banned")
            .setDescription(`<@${user.id}> Is already banned in this server!`),
        ],
      });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      if (member) {
        await interaction.guild.members.ban(user.id, { days: 7, reason });

        await new Punishment({
          userId: user.id,
          guildId: interaction.guild.id,
          staffId: interaction.user.id,
          reason,
          expires,
          type: "ban",
        }).save();
      }
    } catch (e) {
      console.log(e);
      return interaction.reply({
        embeds: [
          embed.setTitle("Error!").setDescription(`Cannot Ban That User!`),
        ],
      });
    }

    return interaction.reply({
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
