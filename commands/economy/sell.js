const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Sell Some Sellable Items!")
    .addStringOption((option) =>
      option
        .setDescription("The Id Of The Item You Want To Buy")
        .setName("item")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addNumberOption((option) =>
      option
        .setName("qty")
        .setDescription("How Many Items? (BTW See Your Inventory First )")
    ),
  testOnly: true,
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = client.custom.economy.items;
    let filtered = choices.filter(
      (choice) =>
        choice.name.toLowerCase().includes(focusedValue) &&
        (choice.sellPrice > 0 || choice.category == "sellable")
    );
    if (focusedValue == "") {
      filtered = filtered.toJSON().slice(0, 25);
    }
    await interaction.respond(
      filtered.map((choice) => ({ name: choice.name, value: choice.slug }))
    );
  },
  async execute(interaction, client) {
    let user = interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    let errorEmbed = new EmbedBuilder().setColor("Red").setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(),
    });

    let { inventory } = userData;

    let item = interaction.options.getString("item");
    let qty = interaction.options.getNumber("qty") || 1;

    let itemData = client.custom.economy.items.get(item);

    if (!itemData) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} Item \`${item}\` Not Found!`
          ),
        ],
      });
    }

    if (itemData.sellPrice === 0 || itemData.category != "sellable") {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} This Is Not A Sellable Item!`
          ),
        ],
      });
    }

    if (!inventory.hasOwnProperty(itemData.slug)) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} You Don't Have Any <:${itemData.slug}:${itemData.icon}> ${itemData.name}`
          ),
        ],
      });
    }

    if (inventory[itemData.slug] < qty) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} You Don't Have Enough <:${itemData.slug}:${itemData.icon}> ${itemData.name} To Sell!`
          ),
        ],
      });
    }

    let profit = itemData.sellPrice * qty;

    console.log(
      `Profit: ${profit}\nItem Sell Price: ${itemData.sellPrice}\nQty: ${qty}`
    );

    inventory[itemData.slug] -= qty;

    if (inventory[itemData.slug] == 0) {
      delete inventory[itemData.slug];
    }

    await User.updateOne(
      {
        discordId: userData.discordId,
      },
      {
        inventory: {
          ...inventory,
        },
        balance: userData.balance + profit,
      }
    );

    let embed = new EmbedBuilder()
      .setDescription(
        `${client.emoji.yeetRightStanding} You Sold **${qty}x** <:${
          itemData.slug
        }:${itemData.icon}> **${itemData.name}** For **${profit}** ${
          client.emoji.yeetCoin
        }\nBought At: **${itemData.buyPrice}** ${client.emoji.yeetCoin}\n**${
          (profit > itemData.buyPrice * qty ? "Profit: " : "Loss: ") +
          profit +
          " " +
          client.emoji.yeetCoin +
          "**"
        }\n**${
          (inventory?.[itemData.slug] ?? 0) +
          " " +
          `<:${itemData.slug}:${itemData.icon}>` +
          itemData.name +
          " Left"
        }**`
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });

    let emitable = client.custom.economy.events.get(itemData.slug);
    if (emitable?.onSell)
      emitable.onSell({
        item: itemData,
        qty,
        user: {
          ...userData,
          discordUser: user,
        },
        inventory,
        channel: interaction.channel,
        client,
      });

    return;
  },
};
