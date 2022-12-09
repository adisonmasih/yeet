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
    .setName("mute")
    .setDescription("He Irritate Duh")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("WHO Irritatin' YA!!!?")
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
        .has(PermissionFlagsBits.MuteMembers)
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
      time *= 3600000;
    } else if (type == "d") {
      time *= 86400000;
    } else if (type == "m") {
      time *= 60000;
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

    try {
      const member = await interaction.guild.members.fetch(user.id);
      if (member) {
        console.log(`time: ${time}ms`);
        await member.timeout(time, reason ?? "secret");
      }
    } catch (e) {
      console.log(e);
      return interaction.reply({
        embeds: [
          embed.setTitle("Error!").setDescription(`Cannot Mute That User!`),
        ],
      });
    }

    if (reason.trim() == "") {
      reason = "Secret!";
    }

    return interaction.reply({
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
