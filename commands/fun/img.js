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

const templates = [
  {
    filename: "couple.jpg",
    resizeDimensions: {
      width: 468,
      height: 468,
    },
    placement: {
      X: 130,
      Y: 5,
    },
  },
  {
    filename: "couple2.jpg",
    resizeDimensions: {
      height: 160,
      width: 160,
    },
    placement: {
      X: 120,
      Y: 13,
    },
  },
  {
    filename: "couple3.jpg",
    resizeDimensions: {
      height: 180,
      width: 180,
    },
    placement: {
      X: 210,
      Y: 28,
    },
  },
  {
    filename: "couple4.jpg",
    resizeDimensions: {
      height: 330,
      width: 330,
    },
    placement: {
      X: 300,
      Y: 10,
    },
  },
  {
    filename: "couple5.jpg",
    resizeDimensions: {
      height: 190,
      width: 190,
    },
    placement: {
      X: 450,
      Y: 15,
    },
  },
];

function getTemplate() {
  return templates[Math.floor(Math.random() * templates.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("img")
    .setDescription(
      "Generate Images For Cocks, Location Meme, Mingles & Much More"
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("cock")
        .setDescription("Make Someone A Cock (Literally)")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mingle")
        .setDescription(
          "Mingle Someone Virtually Cuz They Can't Be In Real Life.."
        )
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("locmeme")
        .setDescription("Why Would Someone Want To Know Your Location!...?")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("What Did You Search In Google?!!!")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("who")
            .setDescription("Who Wants To Know Your Location?!!!")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("laptop")
        .setDescription("Wow Laptop i9 69th Gen..")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("blur")
        .setDescription("A Blurred Version Of Your Or Someone's Avatar!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("gay")
        .setDescription("Heheheheheh GAEEEEE")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("greyscale")
        .setDescription("Classic Greyscale")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("invert")
        .setDescription("Holy Negative!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sepia")
        .setDescription("Holy Sepia!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("triggered")
        .setDescription("U SO TRIGGERED BROOOO")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("advertisement")
        .setDescription("shameless self promotion")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wineaffect")
        .setDescription("wine does affect babies...")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("batslap")
        .setDescription("Batman Slaps Hurt bad...")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The Target User")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("beautiful")
        .setDescription("Amazing, Beautiful, Marvellous")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("bed")
        .setDescription("hatred in bed broooo")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The Target User")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("confusedstonks")
        .setDescription("i'm confused lmao")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("bobross")
        .setDescription("holy bob!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("holy delete!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dcblack")
        .setDescription("holy black!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dcblue")
        .setDescription("holy blue!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("doublestonks")
        .setDescription("holy stonks!")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The Target User")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("facepalm")
        .setDescription("holy face!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("hitler")
        .setDescription("holy hitler!")
        .addUserOption((option) =>
          option.setName("target").setDescription("The Target User")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("jail")
        .setDescription("holy jail!")
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
    if (subcommand == "cock") {
      let outputFilename = await doOverlay({
        target: "cock.jpg",
        overlayUrl: user.displayAvatarURL({ extension: "png", size: 128 }),
        resizeDimensions: {
          height: 110,
          width: 110,
        },
        placement: {
          X: 280,
          Y: 42,
        },
        assetsDir: "assets/",
        outputsDir: "outputs/",
      });

      const embed = new EmbedBuilder()
        .setTitle("A Fat Cock! Just Saying...")
        .setImage("attachment://result.png");

      await interaction.channel.send({
        embeds: [embed],
        files: [
          {
            attachment: `./outputs/${outputFilename}`,
            name: "result.png",
          },
        ],
      });

      interaction.editReply({ content: "Here's Your **Cock**" });
      fs.unlinkSync(`./outputs/${outputFilename}`);
    } else if (subcommand == "mingle") {
      const template = getTemplate();
      let outputFilename = await doOverlay({
        target: template.filename,
        overlayUrl: user.displayAvatarURL({ extension: "png" }),
        resizeDimensions: template.resizeDimensions,
        placement: template.placement,
        assetsDir: "assets/",
        outputsDir: "outputs/",
      });

      const embed = new EmbedBuilder()
        .setTitle(`${user.username} Is Officially Mingle!`)
        .setImage("attachment://result.png");

      await interaction.channel.send({
        embeds: [embed],
        files: [
          {
            attachment: `./outputs/${outputFilename}`,
            name: "result.png",
          },
        ],
      });

      interaction.editReply({ content: "Awww.." });
      fs.unlinkSync(`./outputs/${outputFilename}`);
    } else if (subcommand == "locmeme") {
      let search = interaction.options.getString("search");
      let who = interaction.options.getString("who");

      let outputFilename = await doTextOverlay({
        target: "location.png",
        texts: [
          {
            content: search,
            X: 32,
            Y: 154,
            font: Jimp.FONT_SANS_14_BLACK,
          },
          {
            content: who.toUpperCase() + " wants to",
            X: 154,
            Y: 320,
            font: Jimp.FONT_SANS_16_BLACK,
          },
        ],
        assetsDir: "./assets/",
        outputsDir: "./outputs/",
      });

      const embed = new EmbedBuilder()
        .setTitle(`${user.username} sus...`)
        .setImage("attachment://result.png");

      await interaction.channel.send({
        embeds: [embed],
        files: [
          {
            attachment: `./outputs/${outputFilename}`,
            name: "result.png",
          },
        ],
      });

      interaction.editReply({ content: "Here's Your **Location Meme**" });
      fs.unlinkSync(`./outputs/${outputFilename}`);
    } else if (subcommand == "laptop") {
      let outputFilename = await doOverlay({
        target: "macbook.jpg",
        overlayUrl: user.displayAvatarURL({ extension: "png", size: 128 }),
        resizeDimensions: {
          height: 60,
          width: 60,
        },
        placement: {
          X: 292.5,
          Y: 170,
        },
        assetsDir: "assets/",
        outputsDir: "outputs/",
      });

      const embed = new EmbedBuilder()
        .setTitle(`${user.username} Has A Laptop!`)
        .setImage("attachment://result.png");

      await interaction.channel.send({
        embeds: [embed],
        files: [
          {
            attachment: `./outputs/${outputFilename}`,
            name: "result.png",
          },
        ],
      });

      interaction.editReply({ content: "Here's Your **Laptop**" });
      fs.unlinkSync(`./outputs/${outputFilename}`);
    } else if (subcommand == "blur") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Blur().getImage(
        target.displayAvatarURL({
          size: 512,
          extension: "png",
        }),
        10
      );
      let embed = new EmbedBuilder()
        .setColor(client.colors.PRIMARY)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage("attachment://blur.png");
      let attachment = new AttachmentBuilder()
        .setFile(img, "blur.png")
        .setName("blur.png");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "gay") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Gay().getImage(
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
    } else if (subcommand == "greyscale") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Greyscale().getImage(
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
    } else if (subcommand == "invert") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Invert().getImage(
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
    } else if (subcommand == "sepia") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Sepia().getImage(
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
    } else if (subcommand == "triggered") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Triggered().getImage(
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
        .setImage("attachment://img.gif");
      let attachment = new AttachmentBuilder()
        .setFile(img, "img.gif")
        .setName("img.gif");

      await interaction.editReply({
        content: "Here You Go:",
      });

      return interaction.channel.send({
        embeds: [embed],
        files: [attachment],
      });
    } else if (subcommand == "advertisement") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Ad().getImage(
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
    } else if (subcommand == "wineaffect") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Affect().getImage(
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
    } else if (subcommand == "batslap") {
      let target = options.getUser("target") || interaction.user;

      let img = await new DIG.Batslap().getImage(
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
    } else if (subcommand == "bed") {
      let target = options.getUser("target") || interaction.user;

      let img = await new DIG.Bed().getImage(
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
    } else if (subcommand == "beautiful") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Beautiful().getImage(
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
    } else if (subcommand == "bobross") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Bobross().getImage(
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
    } else if (subcommand == "confusedstonks") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.ConfusedStonk().getImage(
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
    } else if (subcommand == "delete") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Delete().getImage(
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
    } else if (subcommand == "dcblack") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.DiscordBlack().getImage(
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
    } else if (subcommand == "confusedstonks") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.DiscordBlue().getImage(
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
    } else if (subcommand == "doublestonks") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.DoubleStonk().getImage(
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
    } else if (subcommand == "facepalm") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Facepalm().getImage(
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
    } else if (subcommand == "hitler") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Hitler().getImage(
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
    } else if (subcommand == "jail") {
      let target = options.getUser("target") || interaction.user;
      let img = await new DIG.Jail().getImage(
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
