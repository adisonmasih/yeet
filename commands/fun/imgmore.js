const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");
const doOverlay = require("../../core/helpers/overlay");
const doTextOverlay = require("../../core/helpers/text_overlay");
const Jimp = require("jimp");
const DIG = require("discord-image-generation");

function getTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("imgmore")
    .setDescription(
      "Generate Images For Cocks, Location Meme, Mingles & Much More"
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("karaba")
        .setDescription("holy karaba!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kiss")
        .setDescription("holy sweet kiss!")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The Target User")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("presentation")
        .setDescription("holy presentation by lisa!")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("The Text for the presentation")
            .setMinLength(1)
            .setMaxLength(300)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mms")
        .setDescription("holy mms!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("notstonks")
        .setDescription("not stonks!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("putin")
        .setDescription("holy putin!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("rip")
        .setDescription("rip")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("spank")
        .setDescription("holy spank!")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The Target User")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stonks")
        .setDescription("holy stonks!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("tatoo")
        .setDescription("holy tatoo!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("thomas")
        .setDescription("holy train thomas!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("trash")
        .setDescription("holy trash!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wanted")
        .setDescription("holy wanted man!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("circle")
        .setDescription("a circle... just as GOD INTENDED!!!!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    ),
  testOnly: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    let subcommand = interaction.options.getSubcommand() ?? "cock";
    const user = interaction.options.getUser("target") || interaction.user;
    let { options } = interaction;
    if (subcommand == "karaba") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Karaba().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "kiss") {
      let target = options.getUser("target") || interaction.user;

      let img = await new DIG.Kiss().getImage(
        interaction.user.displayAvatarURL({
          size: 512,
          extension: "png",
        }),
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "presentation") {
      let target = options.getUser("target") || interaction.user;
      let text = options.getString("text") || "";
      let img = await new DIG.LisaPresentation().getImage(text);
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "mms") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Mms().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "notstonks") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.NotStonk().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "putin") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Poutine().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "rip") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Rip().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "spank") {
      let target = options.getUser("target") || interaction.user;

      let img = await new DIG.Spank().getImage(
        interaction.user.displayAvatarURL({
          size: 512,
          extension: "png",
        }),
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "stonks") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Stonk().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "tatoo") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Tatoo().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "thomas") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Thomas().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "trash") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Trash().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "wanted") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Wanted().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        }),
        "$"
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "circle") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Circle().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        })
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://img.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.png")
        .setName("img.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    }
  },
};
