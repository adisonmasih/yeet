const generateNonSense = require("./logic.js")
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  PartialTextBasedChannel,
  GuildChannel,
  PermissionOverwriteManager,
} = require("discord.js")
const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const fs = require("fs")
const { env } = require("process")
const { default: mongoose } = require("mongoose")
const mongo = require("./mongo")
const Welcome = require("./schemas/Welcome")
const Leave = require("./schemas/Leave")
const { Player } = require("discord-player")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")

dotenv.config()

let isLocal = false
let CLIENT_TOKEN = process.env.TOKEN

const client = new Client({
  restTimeOffset: 0,
  restRequestTimeout: 60000,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

// client.player = new Player(client, {
//   ytdlOptions: {
//     quality: "highestaudio",
//     highWaterMark: 1 << 25,
//   },
// });


client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  leaveOnEmpty: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
})

client.commands = new Collection()
client.buttons = new Collection()
client.legacyCommands = new Collection()
client.selectMenus = new Collection()
client.voiceGenerator = new Collection()
client.commandArray = []
client.legacyCommandArray = []
client.config = {
  prefix: process.env.PREFIX,
  regex: {
    emoji: /\p{Emoji_Presentation}/gu,
  },
}
client.emoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
  thumbsNeutral: "🤷",
  thumbsUpLarge: "👆",
  thumbsDownLarge: "👇",
  thumbsNeutralLarge: "🤷",
  trollFace: "<:troll_face:1239568627414466581>",
  yeet: "<:yeet_old_logo:1239568635136315542>",
  johhnySins: "<:jn:1239568557898076170>",
  epicGames: "<:epic_games:1239568518651973702>",
  yeetWrongStanding: "<:yeet_wrong_standing:1239568640278265937>",
  yeetRightStanding: "<:yeet_right_standing:1239569042503893064>",
  yeetGreedy: "<:yeet_greedy:1239568632741105674>",
  yeetCoin: "<:yeet_coin:1239568630337900715>",
  pointCurve: "<:point_curve:1239568590374699049>",
}

client.colors = {
  RED: "#2F3136",
  GREEN: "#2F3136",
  BLUE: "#2F3136",
  YELLOW: "#2F3136",
  ORANGE: "#2F3136",
  PURPLE: "#2F3136",
  CYAN: "#2F3136",
  WHITE: "#2F3136",
  BLACK: "#2F3136",
  GREY: "#2F3136",
  PRIMARY: "#2F3136",
}

const functionFolders = fs.readdirSync("./functions/")

for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"))
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client)
  }
}

client.handleEvents()
client.handleCommands()
client.handleComponents()
client.handleLegacyCommands()
  ; (async function () {
    await mongo().then((mongoose) => {
      try {
        console.log("Connected to mongo!!")
        client.login(CLIENT_TOKEN)
      } finally {
        // mongoose.connection.close();
      }
    })
  })()

client.custom = {
  helpers: {},
  cache: {
    channels: {},
  },
  economy: {
    items: new Collection(),
    events: new Collection(),
    categories: [],
  },
}

client.custom.cache.channels.welcome = new Map()

const loadWelcomeChannels = async () => {
  const results = await Welcome.find()

  for (const result of results) {
    client.custom.cache.channels.welcome.set(result._id, {
      channelId: result.channelId,
      message: result.message,
    })
  }
}

loadWelcomeChannels()

client.custom.helpers.getWelcomeDetails = (guildId) => {
  return client.custom.cache.channels.welcome.get(guildId)
}

// Leave Channel Caching

client.custom.cache.channels.leave = new Map()

const loadLeaveChannels = async () => {
  const results = await Leave.find()

  for (const result of results) {
    client.custom.cache.channels.leave.set(result._id, {
      channelId: result.channelId,
      message: result.message,
    })
  }
}

loadLeaveChannels()

client.custom.helpers.getLeaveDetails = (guildId) => {
  return client.custom.cache.channels.leave.get(guildId)
}

client.getItemType = (buyPrice, sellPrice) => {
  if (buyPrice == 0 && sellPrice != 0) {
    return "collectable"
  } else if (buyPrice != 0 && sellPrice == 0) {
    return "powerup"
  } else if (buyPrice == 0 && sellPrice != 0) {
    return "sellable"
  } else if (buyPrice != 0 && sellPrice != 0) {
    return "item"
  }
  return "tool"
}

String.prototype.cap = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.randomX = function (n = 1) {
  let arr = this
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len) throw new RangeError("more elements taken than available")
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

require("./manuals/guild/server")(client)

client.emojiURL = (id) => `https://cdn.discordapp.com/emojis/${id}.png`

require("./system/giveawaySystem")(client)

Array.prototype.common = function () {
  let array = this
  return array.reduce(
    (acc, item) =>
      array.filter((v) => v === acc).length >=
        array.filter((v) => v === item).length
        ? acc
        : item,
    null
  )
}
