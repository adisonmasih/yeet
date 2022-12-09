const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../schemas/User");
const Item = require("../schemas/Item");
const prettyMs = require("pretty-ms");

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

  async onUse({ item, user, inventory, channel }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Used ${item.name}`);
  },
};
