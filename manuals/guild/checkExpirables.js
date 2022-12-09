const Command = require("../../schemas/Command");
const fs = require("fs");
const path = require("path");
const Expirable = require("../../schemas/Expirable");
const User = require("../../schemas/User");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
  const check = async () => {
    const expirables = await Expirable.find({
      expired: false,
    });
    console.log("EXPIREABLE START!!!!!!!!!!!!!!!");
    for (const expirable of expirables) {
      // console.log(expirable);
      // console.log(client.custom.economy.items);
      let item = client.custom.economy.items.get(expirable.itemSlug);
      if (Date.now() > new Date(expirable.date)) {
        await Expirable.updateOne(
          {
            _id: expirable._id,
          },
          {
            expired: true,
          }
        );

        let embed = new EmbedBuilder()
          .setDescription(
            `Your **<:${item.slug}:${item.icon}> ${item.name}** Has Expired!`
          )
          .setColor(client.colors.PRIMARY)
          .setTimestamp(Date.now());

        let userData = await User.findOne({
          discordId: expirable.discordId,
        });

        let { inventory } = userData;

        if (inventory[item.slug]) {
          inventory[item.slug] -= expirable.qty;
        }

        if (inventory[item.slug] == 0 || inventory[item.slug] < 0) {
          delete inventory[item.slug];
        }

        let emitable = client.custom.economy.events.get(item.slug);

        let user = await client.users.fetch(expirable.discordId);

        await User.updateOne({
          discordId: expirable.discordId,
          inventory: { ...inventory },
        });

        if (emitable?.onExpire) {
          await emitable.onExpire({
            item,
            qty: expirable.qty,
            user: {
              ...userData,
              discordUser: user,
            },
            inventory: userData.inventory,
            client,
          });
        }

        await user.send({
          embeds: [embed],
        });
      }
    }
    setTimeout(check, 5 * 1000 * 60);
  };

  check();
};
