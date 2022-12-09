const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../schemas/User");
const Item = require("../schemas/Item");
const prettyMs = require("pretty-ms");
const uniqid = require("../core/helpers/uniqid");
const Expirable = require("../schemas/Expirable");
const { faker } = require("@faker-js/faker");

module.exports = {
  affects: [],
  async onBuy({ item, qty, user, inventory, channel }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Purchased ${qty}x ${item.name}`);
  },

  async onSell({ item, qty, user, inventory, channel }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Sold ${qty}x ${item.name}`);
  },

  async onUse({ item, user, inventory, channel, qty, client }) {
    let { discordUser } = user;
    user = user._doc;
    console.log(`${discordUser.tag} Used ${qty}x ${item.name}`);

    let users = await User.find({}).sort({ balance: "desc" }).limit(10);

    let desc = "";
    let i = 1;

    for (const u of users) {
      let address = u.address;
      let fakeId = await Expirable.findOne({
        discordId: u.discordId,
        itemSlug: "fake_id",
        expired: false,
      });

      let ud = await client.users.fetch(u.discordId);
      let tag = ud.tag;

      if (fakeId) {
        let fullName = faker.name.fullName();
        tag = `${fullName}#${Math.floor(1000 + Math.random() * 9000)}`;
        address = uniqid();
      }

      desc += `\`${i}.\` **${tag} (${address})** - **${u.balance} ${client.emoji.yeetCoin}**\n`;
      i++;
    }

    let embed = new EmbedBuilder()
      .setTitle("Top Robabble Users!")
      .setDescription(desc)
      .setColor(client.colors.PRIMARY)
      .setTimestamp(Date.now())
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    discordUser.send({
      embeds: [embed],
    });
  },
};
