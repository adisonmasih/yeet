const Topgg = require("@top-gg/sdk")
const express = require("express")
const User = require("../../schemas/User")
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js")
const Command = require("../../schemas/Command")

module.exports = (client) => {
return;
  const app = express()
  const webhook = new Topgg.Webhook("Adison@100%")
  app.get("/", (req, res) => {
    res.send("Hello World, from express")
  })
  app.post(
    "/dblwebhook",
    webhook.listener(async (vote) => {
      console.log("Hello From Webhook Log!")
      const discordId = vote.user
      console.log(discordId)
      let userData =
        (await User.findOne({ discordId })) ||
        (await new User({ discordId }).save())
      const { inventory } = userData
      const rewards = [
        {
          slug: "rob_book",
          qty: 1,
        },
        {
          slug: "fake_id",
          qty: 1,
        },
      ]
      let robBook = client.custom.economy.items.get("rob_book")
      let fakeId = client.custom.economy.items.get("fake_id")
      for (const reward of rewards) {
        let { slug } = reward
        let { qty } = reward

        if (inventory[slug]) {
          inventory[slug] += qty
        } else {
          inventory[slug] = qty
        }
      }

      await User.updateOne(
        {
          discordId,
        },
        {
          inventory: {
            ...inventory,
          },
          balance: userData.balance + 100_000,
        }
      )

      let robBookEmitable = client.custom.economy.events.get("rob_book")
      let fakeIdEmitable = client.custom.economy.events.get("fake_id")
      let targetUser = await client.users.fetch(discordId)
      if (robBookEmitable?.onBuy)
        robBookEmitable.onBuy({
          item: robBook,
          qty: 1,
          user: {
            ...userData,
            discordUser: targetUser,
          },
          inventory,
          client,
        })

      if (fakeIdEmitable?.onBuy)
        fakeIdEmitable.onBuy({
          item: fakeId,
          qty: 1,
          user: {
            ...userData,
            discordUser: targetUser,
          },
          inventory,
          client,
        })

      let embed = new EmbedBuilder()
        .setTitle("Thank You!")
        .setDescription(
          `Thanks For Voting Me Out! I Have Rewarded You With:\n<:${robBook.slug}:${robBook.icon}> **1x ${robBook.name}**\n<:${fakeId.slug}:${fakeId.icon}> **1x ${fakeId.name}**\n${client.emoji.yeetCoin} **100,000**\n\n**[[WEBSITE]](https://yeetbot.ml) | [[INVITE ME]](https://invite.yeetbot.ml) | [[SUPPORT SERVER]](http://discord.yeetbot.ml/)**`
        )
        .setColor(client.colors.GREY)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })

      const row = new ActionRowBuilder()
      row.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Visit Website")
          .setURL("https://yeetbot.ml"),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Invite Me")
          .setURL("https://invite.yeetbot.ml/"),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Join Official Server")
          .setURL("https://discord.yeetbot.ml/")
      )

      const row2 = new ActionRowBuilder()
      row2.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Vote On Top.gg")
          .setURL("https://top.gg/bot/990577825922842634/vote"),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Vote On DiscordBotList")
          .setURL("https://discordbotlist.com/bots/yeet-8852/upvote")
      )

      await targetUser.send({
        embeds: [embed],
        components: [row, row2],
      })
    })
  )

  app.get("/commands", async (req, res) => {
    const commands = await Command.find({})
    const count = commands.length
    res.json({
      info: {
        count,
      },
      commands,
    })
  })

  app.listen(80, "0.0.0.0", undefined, () => {
    console.log("Listening On Port 0.0.0.0:80")
  })
}
