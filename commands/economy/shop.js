const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
} = require("discord.js");
const fs = require("fs");
const Item = require("../../schemas/Item");
const { listeners } = require("../../schemas/Welcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Lets See The Hot Items 🔥🔥🔥"),
  testOnly: true,
  async execute(interaction, client) {
    const categories = client.custom.economy.categories;
    let embeds = [];
    let pages = {};
    let itemsData = client.custom.economy.items;
    let items = [];
    let collectables = [];
    let buyables = [];
    await interaction.deferReply();
    interaction.deferred = true;
    for (let i = 0; i < itemsData.size; i++) {
      let currentItem = itemsData.at(i);
      (currentItem.buyPrice == 0 ? collectables : buyables).push({
        name: `<:${itemsData[i.slug]}:${currentItem.icon}> ${
          currentItem.name
        } (${currentItem.rarity})`,
        value: `${currentItem.description}
        • Buy Price: ${
          currentItem.buyPrice == 0 ? "Not Buyable" : currentItem.buyPrice
        }
        • Sell Price: ${
          currentItem.sellPrice == 0 ? "Not Sellable" : currentItem.sellPrice
        } `,
        category: currentItem.category,
      });
    }

    items = [...buyables, ...collectables];

    const selectRow = new ActionRowBuilder();
    let selectOptions = [];
    selectOptions.push({
      label: "All",
      value: "all",
    });
    categories.forEach((v) => {
      selectOptions.push({
        label: `${v.replace(v.charAt(0), v.charAt(0).toUpperCase())}`,
        value: v,
      });
    });

    selectRow.addComponents(
      new SelectMenuBuilder()
        .setCustomId("shop_select")
        .setPlaceholder("Choose A Category")
        .setOptions(selectOptions)
    );

    for (let i = 0; i < items.length; i++) {
      if (i % 5 == 0) {
        embeds.push(
          new EmbedBuilder()
            .setTitle("Yeet Shop")
            .setDescription(`Shop Items for Yeet!`)
            .setColor(client.colors.GREY)
            .addFields(items.slice(i, i + 5))
        );
      }
    }

    const getRow = (id, disable = false) => {
      const row = new ActionRowBuilder();
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("prev_embed")
          .setEmoji("<:previous:863198512824188929>")
          .setStyle(!disable ? ButtonStyle.Primary : ButtonStyle.Secondary)
          .setDisabled(pages[id] === 0 || disable),
        new ButtonBuilder()
          .setCustomId("next_embed")
          .setEmoji("<:next:863198512915939338>")
          .setStyle(!disable ? ButtonStyle.Primary : ButtonStyle.Secondary)
          .setDisabled(pages[id] === embeds.length - 1 || disable)
      );
      return row;
    };

    const id = interaction.user.id;
    pages[id] = pages[id] || 0;
    let embed = embeds[pages[id]];

    let collector;

    const filter = (i) => i.user.id === id;
    const time = 1000 * 60 * 2;

    await interaction.editReply({
      embeds: [embed],
      components: [selectRow, getRow(id)],
    });

    collector = interaction.channel.createMessageComponentCollector({
      filter,
      time,
    });

    collector.on("collect", (btnInt) => {
      if (!btnInt) {
        return;
      }

      if (!btnInt?.deferred) btnInt.deferUpdate();

      if (
        btnInt.customId !== "next_embed" &&
        btnInt.customId !== "prev_embed"
      ) {
        return;
      }

      if (btnInt.customId === "prev_embed" && pages[id] > 0) {
        pages[id]--;
      } else if (
        btnInt.customId === "next_embed" &&
        pages[id] < embeds.length - 1
      ) {
        pages[id]++;
      }

      interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [selectRow, getRow(id)],
      });
    });

    let selectCollector = interaction.channel.createMessageComponentCollector({
      filter,
      time,
    });

    let used = false;

    selectCollector.on("end", async (sint) => {
      console.log("select collector end");
      await interaction.editReply({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(
            selectRow.components[0].setDisabled(true)
          ),
          getRow(id, true),
        ],
      });
    });

    collector.on("end", async (sint) => {
      console.log("normal collector end");
      await interaction.editReply({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(
            selectRow.components[0].setDisabled(true)
          ),
          getRow(id, true),
        ],
      });
    });

    selectCollector.on("collect", async (sint) => {
      if (sint.customId != "shop_select") return;
      used = true;
      let cat = sint.values[0];

      // selectRow.components[0].options = items
      //   .filter((v) => v.category == cat)
      //   .map((v) => {
      //     return {
      //       label: v.replace(v.charAt(0), v.charAt(0).toUpperCase()),
      //       value: v,
      //     };
      //   });
      console.log("\n\nitems:", items, "\n\n");
      console.log("\n\nsint", sint, "\n\n");
      console.log(
        "\n\n items category:\n",
        items.map((itm) => `${itm?.name}: ${itm?.category}`).join("\n")
      );
      let filteredItems =
        cat != "all" ? items.filter((item) => item.category == cat) : items;
      // console.log(filteredItems);
      console.log(items);
      embeds = [];
      for (let i = 0; i < filteredItems.length; i++) {
        if (i % 5 == 0) {
          embeds.push(
            new EmbedBuilder()
              .setTitle("Yeet Shop")
              .setDescription(`Shop Items for Yeet!`)
              .setColor(client.colors.GREY)
              .addFields(filteredItems.slice(i, i + 5))
          );
        }
      }
      console.log(`\n\nEMBEDS:`, embeds, "\n\nEND EMBEDS\n\n");
      console.log(`fitems:\n`, filteredItems, "\n\nend fitems");
      console.log(`pages:\n`, pages, "\n\nend pages");
      pages[id] = 0;
      console.log(`pages updated:\n`, pages, "\n\nend pages updated");
      embed = embeds[pages[id]];
      console.log(`embed:\n`, embed, "\n\nend embed\n\n");

      await interaction.editReply({
        embeds: [embed],
        components: [selectRow, getRow(id)],
      });
    });
  },
};
