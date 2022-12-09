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

  async onUse({ item, user, inventory, channel, client, qty }) {
    let { discordUser } = user;
    console.log(`${discordUser.tag} Used ${item.name}`);
    // console.log(user);
    let currentLimit = Math.floor(user._doc.bankLimit);
    let newLimit = Math.floor(
      Math.floor(currentLimit + (50 / 100) * currentLimit) * qty
    );

    await User.updateOne({
      discordId: discordUser.id,
      bankLimit: newLimit,
    });

    const embed = new EmbedBuilder()
      .setDescription(
        `Congo! Your Bank Account Limit Has Been Increased To ${newLimit} ${client.emoji.yeetCoin}!`
      )
      .setColor(client.colors.PRIMARY)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    await discordUser.send({
      embeds: [embed],
    });
  },
};
