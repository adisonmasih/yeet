// https://source.unsplash.com/random/512x512?cat
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js")
const apiKey = "vut81frFGwuuG0e1oj2FPGVZMVJEl4LrlnQvhEEVRlk"
const apiSecret = "8NlLfQgTBy5TY_eU5mKutxfqoX8rTdN5JEsozlFE14c"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animals")
    .setDescription("Sweet Image Of Animals")
    .addSubcommand((subcommand) =>
      subcommand.setName("cat").setDescription("Cute Images of Cats")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("dog").setDescription("Cute Images of Dogs")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("lion").setDescription("Cute Images of Lions")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("bird").setDescription("Cute Images of birds")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("bear").setDescription("Cute Images of Bears")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("fish").setDescription("Cute Images of Fish")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("horse").setDescription("Cute Images of Horses")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("monkey").setDescription("Cute Images of Monkey")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("panda").setDescription("Cute Images of Pandas")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("shark").setDescription("Cute Images of Sharks")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("tiger").setDescription("Cute Images of Tigers")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("seal").setDescription("Cute Images of Seals")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("pig").setDescription("Cute Images of pigs")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("rabbit").setDescription("Cute Images of Rabbits")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("fox").setDescription("Cute Images of Foxes")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("goat").setDescription("Cute Images of goat")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("elephant").setDescription("Cute Images of Elephants")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("cow").setDescription("Cute Images of Cows")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("gorilla").setDescription("Cute Images of Gorillas")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("dolphin").setDescription("Cute Images of Dolphins")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("deer").setDescription("Cute Images of Deers")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("goose").setDescription("Cute Images of Goose")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("giraffe").setDescription("Cute Images of Giraffe")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("flamingo").setDescription("Cute Images of flamingo")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ostrich").setDescription("Cute Images of Ostrich")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const animal = interaction.options.getSubcommand() || "cat"
    await interaction.deferReply()
    let res = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${animal}`
    )
    let json = await res.json()
    let img = json.urls.small

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("View On Unsplash.com")
        .setStyle(ButtonStyle.Link)
        .setURL(json?.links?.html ?? "https://unsplash.com")
    )

    let embed = new EmbedBuilder()
      .setTitle(`Cute Pic Of ${animal.toUpperCase()}`)
      .setDescription(
        `${json?.description ?? json.alt_description ?? "Just Wow ✨"}`
      )
      .setColor(client.colors.PRIMARY)
      .setImage(img)
      .addFields(
        {
          name: "Views 👀",
          value: `\`${json?.views ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Likes 💖",
          value: `\`${json?.likes ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Downloads 💾",
          value: `\`${json?.downloads ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Camera 📸",
          value: `\`${json?.exif?.name ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Exposure Time 📹",
          value: `\`${json?.exif?.exposure_time ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Aperture 🎦",
          value: `\`${json?.exif?.aperture ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "ISO 📀",
          value: `\`${json?.exif?.iso ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Location 🌍",
          value: `\`${json?.location?.name ?? "Unknown"}\``,
          inline: true,
        },
        {
          name: "Author 👤",
          value: `\`${json?.user?.name ?? "Unknown"}\``,
          inline: true,
        }
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `Images & Info By Unsplash.com`,
        iconURL: interaction.user.displayAvatarURL(),
      })

    return interaction.editReply({
      embeds: [embed],
      components: [row],
    })
  },
}
