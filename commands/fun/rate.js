const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rate")
    .setDescription("RATE MY GIRL..")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("gay")
        .setDescription("How Much Gay? Gay Much How?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who's Too Gay?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sexist")
        .setDescription("How Much Sexist Are You?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who's Too Sexist?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("racist")
        .setDescription("How Much Racist Are You?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who's Too Racist?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sextime")
        .setDescription("How Long Do You Last?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who Lasts Too Long?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("simp")
        .setDescription("How Much Simp Are You?")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Yooo Who's Too Much Of A Simp?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sexy")
        .setDescription("How Much Sexy Are You?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who's Too Sexy?")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("pp")
        .setDescription("How Much Long Is Your PP?")
        .addUserOption((option) =>
          option.setName("target").setDescription("Yooo Who's Got A Looong PP?")
        )
    ),
  testOnly: true,
  async execute(interaction, client) {
    const target = interaction.options.getUser("target") || interaction.user;
    let subcommand = interaction.options.getSubcommand() ?? "gay";

    if (subcommand == "gay") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 0;

      const embed = new EmbedBuilder()
        .setTitle(`Gay Rate Machine`)
        .setDescription(`<@${target.id}> Is **${rate}%** Gay`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "sexist") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 0;

      const embed = new EmbedBuilder()
        .setTitle(`Sexist Rate Machine`)
        .setDescription(`<@${target.id}> Is **${rate}%** Sexist`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "racist") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 0;

      const embed = new EmbedBuilder()
        .setTitle(`Racist Rate Machine`)
        .setDescription(`<@${target.id}> Is **${rate}%** Racist`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "sextime") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 100;

      const embed = new EmbedBuilder()
        .setTitle(`SexTime Machine`)
        .setDescription(
          `<@${target.id}> Lasts **${Math.random() < 0.5 ? "Less" : "Long"
          }** Than **${rate}%** Of The Men`
        )
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "simp") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 0;

      const embed = new EmbedBuilder()
        .setTitle(`Simp Rate Machine`)
        .setDescription(`<@${target.id}> Is **${rate}%** Simp`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "sexy") {
      let rate = Math.floor(Math.random() * 100);

      if (target.id === "974598781913923594") rate = 100;

      const embed = new EmbedBuilder()
        .setTitle(`Sexy Rate Machine`)
        .setDescription(`<@${target.id}> Is **${rate}%** Sexy`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    } else if (subcommand == "pp") {
      let length = Math.floor(Math.random() * 30);
      let str = "8";

      if (target.id === "974598781913923594") length = 30;

      for (let i = 0; i < length; i++) {
        str += "=";
      }

      str += "D";

      const embed = new EmbedBuilder()
        .setTitle(`PP Rate Machine`)
        .setDescription(`<@${target.id}>'s Penis\n${str}`)
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(target.displayAvatarURL())
        .setFooter({
          text: "Requested By " + interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
