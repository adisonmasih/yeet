const { PermissionsBitField, PermissionFlagsBits } = require("discord.js")
const RoleMessage = require("../../schemas/RoleMessage")

const cache = {} // { guildId: [message, { Emoji: RoleID }] }

const fetchCache = (guildId) => cache[guildId] || []

const addToCache = async ({
  client,
  guildId,
  message,
  emoji,
  roleId,
  requiredRole,
}) => {
  // console.log(client);
  const array = cache[message.id] || [message, {}, requiredRole]
  if (emoji && roleId) {
    array[1][emoji] = roleId
  }
  // console.log(message);
  console.log(client.guild)
  // const guild = await client.guilds.fetch(guildId);

  // const channel = await guild.channels.fetch(message.channelId);
  // await channel.messages.fetch(message.id, true, true);
  cache[message.id] = array
  console.log("START CACHE\n_______________")
  console.log(cache)
  console.log("END CACHE\n_______________")
}

const removeFromCache = async (messageId, emoji, roleId) => {
  delete cache[messageId][1][emoji]
  return cache
}

const handleReaction = async ({ reaction, user, adding }) => {
  // console.log(reaction);
  console.log("reached handle reaction event with " + adding)
  const { message } = reaction
  const { guild } = message

  // message.channel
  //   .createInvite()
  //   .then((invite) =>
  //     console.log(
  //       `Created an invite with for "${guild.name}" https://discord.gg/${invite.code}`
  //     )
  //   )
  //   .catch(console.error);

  if (user.bot) {
    console.log("i suppose bots aren't supposed for that :\\")
    return
  }

  const [fetchedMessage, roles, requiredRole] = fetchCache(message.id)
  if (!fetchedMessage || !roles) {
    console.log(`No roles found for ${guild.name} in cache`)
    return
  }
  console.log(guild.name)
  console.log(`fetchmsg and roles: `, fetchedMessage, roles)
  if (!fetchedMessage) return

  console.log("did not return cuz fetched message is not null")
  console.log(`message: ${message.id} and fetchedMessage: ${fetchedMessage.id}`)
  if (fetchedMessage.id == message.id) {
    const toCompare = reaction.emoji.id || reaction.emoji.name
    console.log(toCompare)
    for (const key of Object.keys(roles)) {
      console.log(`${key}: ${roles[key]} : ${toCompare}`)
      if (key === toCompare || key.includes(toCompare)) {
        console.log("KEY === TO COMPARE")
        const role = await guild.roles.cache.get(roles[key])
        if (role) {
          console.log("ROLE FOUND")
          const member = await guild.members.fetch(user.id)
          console.log(`user id: ${user.id}`)
          console.log(member)
          console.log(`required role: `, requiredRole)
          if (adding) {
            console.log("ADDING")
            if (member?.roles?.cache?.has?.(requiredRole)) {
              await member.roles.add(role)
            } else {
              let mx = await message.channel.send({
                content: `<@${user.id}> You Can't Get That That Role Cuz You Don't Have The Required Role <@&${requiredRole}>!`,
              })
              setTimeout(async () => await mx.delete(), 5000)
            }
          } else {
            console.log("REMOVING")
            await member.roles.remove(role)
          }
        }
        return
      } else {
        console.log("not found reaction emoji")
      }
    }
  } else {
    console.log("not found message")
  }
}

const updateDirectCache = async ({
  client,
  message,
  guildId,
  roles,
  requiredRole,
}) => {
  cache[message.id] = [message, roles || {}, requiredRole]
}

module.exports = {
  name: "rr",
  async execute(client) {
    const results = await RoleMessage.find()

    for (const result of results) {
      let { guildId, channelId, messageId, roles, requiredRole } = result

      let guild

      try {
        guild = await client.guilds.fetch(guildId)
      } catch (e) {
        console.log(`Couldn't Fetch Guild With Id: ${guildId}`)
        continue
      }

      const channel = await guild.channels.fetch(channelId)

      if (!channel) {
        console.log(`Could not find channel with id: "${channelId}"`)
        // await RoleMessage.deleteOne({ channelId });
        continue
      }

      if (roles[0] && !roles[0]["emoji"]) {
        console.log("removing empty array")
        roles = []

        await RoleMessage.updateOne(
          {
            messageId,
          },
          {
            roles: [],
          }
        )

        console.log("removed empty array")

        continue
      }

      try {
        const cacheMessages = true
        const skipCache = true

        // console.log(messageId);
        const fetchedMessage = await channel.messages.fetch(messageId, {
          cacheMessages,
          skipCache,
        })

        if (fetchedMessage) {
          console.log("fetch message exists!!")
          let refactoredRoles = {}
          roles.forEach((role) => {
            refactoredRoles[role.emoji] = role.role
          })

          cache[messageId] = [fetchedMessage, refactoredRoles, requiredRole]
          console.log(cache)
        } else {
          console.log("msg no exist")
        }
      } catch (e) {
        console.log(e)
        console.log(`Removing message id "${messageId}" from the database`)
        // await RoleMessage.deleteOne({ messageId });
        continue
      }
    }
  },
}

module.exports.fetchCache = fetchCache
module.exports.addToCache = addToCache
module.exports.handleReaction = handleReaction
module.exports.updateDirectCache = updateDirectCache
module.exports.removeFromCache = removeFromCache
