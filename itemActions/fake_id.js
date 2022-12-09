const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../schemas/User");
const Item = require("../schemas/Item");
const Expirable = require("../schemas/Expirable");
const prettyMs = require("pretty-ms");

module.exports = {
  affects: [],
  async onBuy({ item, qty, user, inventory, channel, client }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Purchased ${qty}x ${item.name}`);

    let currentDate = Date.now();
    let days = 0;

    for (let i = 0; i < qty; i++) {
      ++days;
      currentDate += 60 * 60 * 24 * 1000;
    }

    let expirable = new Expirable();
    expirable.discordId = discordUser.id;
    expirable.date = currentDate;
    expirable.itemSlug = item.slug;
    expirable.qty = qty;
    expirable.expired = false;
    await expirable.save();

    let embed = new EmbedBuilder()
      .setDescription(
        `You Have Been Disguised On The Robber's List For **${
          days == 1 ? "24H" : days + " Days"
        }**\nTill \`(${
          new Date(currentDate).toLocaleDateString("en-in") +
          " " +
          new Date(currentDate).toLocaleTimeString()
        })\`...\nShhhh.. Don't Tell Anyone 🤫🤫`
      )
      .setColor(client.colors.PRIMARY)
      .setTimestamp(Date.now());

    await discordUser.send({
      embeds: [embed],
    });
  },

  async onSell({ item, qty, user, inventory, channel }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Sold ${qty}x ${item.name}`);
  },

  async onUse({ item, user, inventory, channel }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Used ${item.name}`);
  },

  async onExpire({ item, user, inventory, qty, client }) {
    // const { discordUser } = user;
    // let embed = new EmbedBuilder()
    //   .setDescription(
    //     `Your **<:${item.slug}:${item.icon}> ${item.name}** Has Expired!`
    //   )
    //   .setColor(client.colors.PRIMARY)
    //   .setTimestamp(Date.now());
    // await discordUser.send({
    //   embeds: [embed],
    // });
  },
};
