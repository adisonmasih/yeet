const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const Item = require("../../schemas/Item");
const User = require("../../schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("What You Got? 🤔")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who's Inventory?")
    ),
  testOnly: true,
  async execute(interaction, client) {
    let embeds = [];
    let pages = {};

    let user = interaction.options.getUser("user") || interaction.user;
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    let inventory = userData.inventory;
    let items = [];

    await interaction.deferReply();
    interaction.deferred = true;

    for (const n in inventory) {
      if (n == "isInventory") continue;
      console.log(`Slug: ${n}`);
      let realItem = await Item.findOne({ slug: n });
      let title = `<:${n}:${realItem.icon}> **${realItem.name}** ─ ${inventory[n]}`;
      let type = `${client.emoji.pointCurve} ` + realItem.category.cap();
      let pushable = {
        name: title ?? "Unknown",
        value: type ?? "None",
      };

      items.push(pushable);
    }

    if (items.length == 0) {
      let xEmbed = new EmbedBuilder()
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        })
        .setDescription(
          `Your Inventory Is Empty! Use \`/buy\` To Get Some Items!`
        )
        .setColor(client.colors.GREY);

      return interaction.editReply({
        embeds: [xEmbed],
      });
    }

    for (let i = 0; i < items.length; i++) {
      if (i % 5 == 0) {
        let xEmbed = new EmbedBuilder()
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(`Inventory`)
          .setColor(client.colors.GREY);

        if (items.length > 0) xEmbed = xEmbed.addFields(items.slice(i, i + 5));

        embeds.push(xEmbed);
      }
    }

    const getRow = (id) => {
      const row = new ActionRowBuilder();
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("prev_embed")
          .setEmoji("<:previous:863198512824188929>")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(pages[id] === 0),
        new ButtonBuilder()
          .setCustomId("next_embed")
          .setEmoji("<:next:863198512915939338>")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(pages[id] === embeds.length - 1)
      );
      return row;
    };

    const id = interaction.user.id;
    pages[id] = pages[id] || 0;
    const embed = embeds[pages[id]];

    let collector;

    const filter = (i) => i.user.id === id;
    const time = 1000 * 60 * 5;

    await interaction.editReply({
      embeds: [embed],
      components: [getRow(id)],
    });

    collector = interaction.channel.createMessageComponentCollector({
      filter,
      time,
    });
    collector.on("collect", async (btnInt) => {
      if (!btnInt) {
        return;
      }

      try {
        await btnInt.deferUpdate();
      } catch (e) {
        console.log("yet another defer error");
      }

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

      await interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [getRow(id)],
      });
    });

    collector.on("end", () => {
      collector.stop();
    });
  },
};
