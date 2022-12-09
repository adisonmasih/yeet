const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../schemas/User");
const prettyMs = require("pretty-ms");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Get An Hot Item From The Shop 🔥🔥🔥")
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
        .setDescription("How Many Items? (BTW See Your Pockets First )")
    ),
  testOnly: true,
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = client.custom.economy.items;
    const filtered = choices.filter(
      (choice) =>
        choice.name.toLowerCase().includes(focusedValue) &&
        choice.buyPrice > 0 &&
        choice.category != "sellable"
    );
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

    if (itemData.buyPrice === 0) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} This Is A Collectable Not A Purchasable Item!`
          ),
        ],
      });
    }

    if (itemData.buyPrice * qty > userData.balance) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} You Don't Have Enough Yeet Coins!`
          ),
        ],
      });
    }

    let inventory = userData.inventory;

    let itemExistsInInventory = inventory[itemData.slug] ?? false;

    if (itemExistsInInventory) {
      inventory[itemData.slug] += qty;
    } else {
      inventory[itemData.slug] = qty;
    }

    let priceToDeduct = itemData.buyPrice * qty;

    console.log(
      `Price To Deduct: ${priceToDeduct}\nItem Price: ${itemData.buyPrice}\nQty: ${qty}`
    );

    await User.updateOne(
      {
        discordId: userData.discordId,
      },
      {
        inventory: {
          ...inventory,
        },
        $inc: {
          balance: priceToDeduct * -1,
        },
      }
    );

    let embed = new EmbedBuilder()
      .setDescription(
        `${client.emoji.yeetRightStanding} Pumped **${qty}x** **${
          itemData.name
        }** Into Your Inventory\n${
          client.emoji.yeetGreedy
        } **Expenditure: ** ${Math.abs(priceToDeduct)} ${client.emoji.yeetCoin}`
      )
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });

    let emitable = client.custom.economy.events.get(itemData.slug);
    if (emitable?.onBuy)
      emitable.onBuy({
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
