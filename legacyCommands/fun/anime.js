const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "anime",
  aliases: ["anm"],
  description: "Search For An Anime!",
  args: {
    required: [
      {
        name: "search",
        type: "text",
      },
    ],
    // separator: "__NO_SEPARATOR__",
  },
  async execute(message, args, client, mentions) {
    let search = args.join(" ");
    let res = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${search}`
    );
    let anime = await res.json();

    if (anime.data.length == 0) {
      let embed = new EmbedBuilder()
        .setDescription("❌ Anime Not Found")
        .setColor("Red")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        });

      return message.reply({
        embeds: [embed],
      });
    }

    anime = anime.data[0];
    let url = `https://kitsu.io/anime/${anime.attributes.slug}`;

    let embed = new EmbedBuilder()
      .setTitle(`${anime?.attributes?.canonicalTitle ?? ""}`)
      .setDescription(
        `
        ${anime?.attributes?.synopsis ?? "UNKNOWN"}\n
        ${url}\n
      `
      )
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: "Requested By " + message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })

      .addFields(
        {
          name: "⏳ Status",
          value: `${
            (anime.attributes.status ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.status
          }`,
          inline: true,
        },
        {
          name: "🗂 Type",
          value: `${
            (anime.attributes.subtype ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.subtype
          }`,
          inline: true,
        },
        {
          name: "➡️ Age Rating",
          value: `${
            (anime.attributes.ageRatingGuide ?? "").toString().trim().length ==
            0
              ? "UNKNOWN"
              : anime.attributes.ageRatingGuide
          }`,
        },
        {
          name: "🗓 Aired",
          value: `From **${
            (anime.attributes.startDate ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.startDate
          }** To **${
            (anime.attributes.endDate ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.endDate
          }**`,
        },
        {
          name: "💽 Total Episodes",
          value: `${
            (anime.attributes.episodeCount ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.episodeCount
          }`,
          inline: true,
        },
        {
          name: "⏱ Duration",
          value: `${
            (anime.attributes.episodeLength ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.episodeLength
          } min`,
          inline: true,
        },
        {
          name: "⭐ Average Rating",
          value: `${
            (anime.attributes.averageRating ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.averageRating
          }/100`,
          inline: true,
        },
        {
          name: "🏆 Rank (By Popularity)",
          value: `${
            (anime.attributes.popularityRank ?? "").toString().trim().length ==
            0
              ? "UNKNOWN"
              : anime.attributes.popularityRank
          }`,
          inline: true,
        },
        {
          name: "🏆 Rank (By Rating)",
          value: `${
            (anime.attributes.ratingRank ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.ratingRank
          }`,
          inline: true,
        },
        {
          name: ":man: Viewers",
          value: `${
            (anime.attributes.userCount ?? "").toString().trim().length == 0
              ? "UNKNOWN"
              : anime.attributes.userCount
          }`,
          inline: true,
        }
      );

    if (anime?.attributes?.coverImage?.original) {
      embed = embed.setImage(anime.attributes.coverImage.original ?? "UNKNOWN");
    }

    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("View On Kitsu.io")
        .setURL(url ?? "UNKNOWN")
        .setStyle(ButtonStyle.Link)
    );

    await message.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
