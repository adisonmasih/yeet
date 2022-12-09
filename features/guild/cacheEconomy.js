const Item = require("../../schemas/Item");
const { Collection } = require("discord.js");
const fs = require("fs");
const checkExpirables = require("../../manuals/guild/checkExpirables");

module.exports = {
  name: "cacheEconomy",
  async execute(client) {
    const updateEconomyCache = async () => {
      let items = await Item.find({});
      client.custom.economy.items = new Collection();
      for (let item of items) {
        let actionPath = `../../itemActions/${item.slug}`;
        let itemEvents = {};
        try {
          itemEvents = require(actionPath);
        } catch (e) {
          console.log(`${item.slug} Has No Events!`);
        }
        console.log("Item Events: ", itemEvents);
        client.custom.economy.items.set(item.slug, item);
        client.custom.economy.events.set(item.slug, itemEvents);
        if (!client.custom.economy.categories.includes(item.category)) {
          client.custom.economy.categories.push(item.category);
        }
      }

      console.log(`Cached ${items.length} items`);
      setTimeout(updateEconomyCache, 1000 * 60 * 60 * 2);
    };

    await updateEconomyCache();
    checkExpirables(client);
  },
};
