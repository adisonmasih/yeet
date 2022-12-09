const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("View Your Or Some Other User's Rank")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who's Rank?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    interaction.reply({
      content: "Creating Your Awesome Rank Card...",
    });
    let user = interaction.options.getUser("user") || interaction.user;
    let member = await interaction.guild.members.cache.get(user.id);
    const { guild } = member;
    const guildId = guild.id;
    const userId = user.id;
    const result = await Profile.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const highestRankHolders = await Profile.find({
      guildId,
    }).sort({ level: "desc" });

    let rank = 0;

    console.log(highestRankHolders);

    highestRankHolders.forEach((rankHolder, index) => {
      console.log("NO DESCRIMINATION:" + index);
      if (rankHolder.userId == userId) {
        console.log(`MATCH FOUND: ${index}`);
        rank = index + 1;
        console.log(`NEW RANK: ${rank}`);
      }
    });

    console.log("AFTER RANK: " + rank);

    const rankImg = new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ extension: "png", dynamic: false }))
      .setCurrentXP(result.xp)
      .setRequiredXP(
        result.level * result.level * 100 < 100
          ? 100
          : result.level * result.level * 100
      )
      .setStatus("online")
      .setProgressBar("#f55a42", "COLOR")
      .setUsername(user.username)
      .setLevel(result.level)
      .setRank(rank)
      .setDiscriminator(user.discriminator);

    let finalRankBuffer = await rankImg.build();

    const attachment = new AttachmentBuilder(finalRankBuffer, {
      name: "rank.png",
    });

    await interaction.channel.send({
      files: [attachment],
    });
    interaction.editReply({
      content: "Here's The Rank Card:",
    });
  },
};
