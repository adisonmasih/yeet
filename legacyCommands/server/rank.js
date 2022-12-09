const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
const Profile = require("../../schemas/Profile");

module.exports = {
  name: "rank",
  aliases: ["rnk"],
  description: "A Nice Card On A Beautiful Shard.. Wohoo Yeet's A Poet Now!",
  args: {
    optional: [
      {
        name: "user",
        type: "user",
      },
    ],
    // separator: ", ",
  },
  async execute(message, args, client, mentions) {
    let user = mentions.size > 0 ? mentions.first() : message.author;
    let member = await message.guild.members.cache.get(user.id);
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

    message.channel.send({
      files: [attachment],
    });
  },
};
