const {
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Send A Customized Embed!")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The Embed Title")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("The Embed Description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color").setDescription("The Embed Color").addChoices(
        {
          name: "Default",
          value: "Default",
        },
        {
          name: "Transparent",
          value: "#2F3136",
        },
        {
          name: "Red",
          value: "Red",
        },
        {
          name: "White",
          value: "White",
        },
        {
          name: "Aqua",
          value: "Aqua",
        },
        {
          name: "Green",
          value: "Green",
        },
        {
          name: "Blue",
          value: "Blue",
        },
        {
          name: "Yellow",
          value: "Yellow",
        },
        {
          name: "Purple",
          value: "Purple",
        },
        {
          name: "Luminous Vivid Pink",
          value: "LuminousVividPink",
        },
        {
          name: "Gold",
          value: "Gold",
        },
        {
          name: "Orange",
          value: "Orange",
        },
        {
          name: "Grey",
          value: "Grey",
        },
        {
          name: "Navy",
          value: "Navy",
        }
      )
    )
    .addUserOption((option) =>
      option.setName("author").setDescription("The Embed Author")
    )
    .addAttachmentOption((option) =>
      option.setName("thumbnail").setDescription("The Embed Thumbnail")
    )
    .addAttachmentOption((option) =>
      option.setName("image").setDescription("The Embed Image")
    ),
  testOnly: true,
  async execute(interaction, client) {
    const { options } = interaction;
    let embed = new EmbedBuilder()
      .setTitle(options.getString("title"))
      .setDescription(options.getString("description"));

    if (options.getString("color")) {
      embed = embed.setColor(options.getString("color") || "Default");
    }

    if (options.getUser("author")) {
      let author = options.getUser("author");
      embed = embed.setAuthor({
        name: author.username,
        iconURL: author.displayAvatarURL(),
      });
    }

    const thumbnail = interaction?.options?.getAttachment?.("thumbnail");
    const image = interaction?.options?.getAttachment?.("image");

    if (thumbnail) {
      embed = embed.setThumbnail(thumbnail.url);
    }

    if (image) {
      embed = embed.setImage(image.url);
    }

    interaction.reply({
      embeds: [embed],
    });
  },
};
