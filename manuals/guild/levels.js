const mongoose = require("mongoose")
const Profile = require("../../schemas/Profile")
const LevelSetup = require("../../schemas/LevelSetup")

module.exports = async (message, client) => {
  const { guild, member } = message
  await addXp(guild.id, member.id, 10, member, message)
}

const getNeededXp = (level, xp) =>
  Math.floor(level * level * 100) < 100 ? 100 : Math.floor(level * level * 100)

const addXp = async (guildId, userId, xpToAdd, member, message) => {
  const result = await Profile.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        xp: xpToAdd,
      },
    },
    {
      upsert: true,
      new: true,
    }
  )

  let { xp, level } = result
  const needed = getNeededXp(level, xp)

  if (xp >= needed) {
    ++level
    xp -= needed

    await Profile.updateOne(
      {
        guildId,
        userId,
      },
      {
        level,
        xp,
      }
    )
    // xp += 10;
    try {
      let result = await LevelSetup.findOne({
        guildId,
      })

      if (!result) {
        return
      }

      console.log(result)
      let { sendType: type, text, channelId: sendChannelId } = result

      text = text
        .replaceAll("$PING", `<@${userId}>`)
        .replaceAll("$LEVEL", level)
        .replaceAll("$TAG", member.user.tag)
        .replaceAll("$GUILD", member.guild.name)

      switch (type) {
        case "onthestop":
          {
            await message.channel.send({
              content: text,
            })
          }
          break
        case "dm":
          {
            await member.send({
              content: text,
            })
          }
          break
        case "channel":
          {
            let sendChannel = await member.guild.channels.cache.get(
              sendChannelId
            )
            await sendChannel.send({
              content: text,
            })
          }
          break
        case "quiet":
          {
          }
          break
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports.addXp = addXp
