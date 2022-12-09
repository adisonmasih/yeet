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
    .setName("use")
    .setDescription("Use A Usable Item!")
    .addStringOption((option) =>
      option
        .setName("item")
        .setDescription("The Item You Wanna Use...")
        .setRequired(true)
        .setMinLength(1)
        .setAutocomplete(true)
    )
    .addNumberOption((option) =>
      option
        .setName("qty")
        .setDescription("How Much Items You Wanna Use?")
        .setMinValue(1)
    ),
  testOnly: true,
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = client.custom.economy.items;
    const filtered = choices.filter(
      (choice) =>
        choice.name.toLowerCase().includes(focusedValue) && choice.buyPrice > 0
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice.name, value: choice.slug }))
    );
  },
  async execute(interaction, client) {
    let embeds = [];
    let pages = {};

    let user = interaction.user;
    let itemSlug = interaction.options.getString("item") || "";
    let qty = interaction.options.getNumber("qty") || 1;

    let item = client.custom.economy.items.get(itemSlug);

    let errorEmbed = new EmbedBuilder().setColor("Red").setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(),
    });

    if (!item) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} Item \`${itemSlug}\` Not Found!`
          ),
        ],
      });
    }

    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    let inventory = userData.inventory;

    if (!inventory[itemSlug] || inventory[itemSlug] < qty) {
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            `${client.emoji.yeetWrongStanding} You Don't Have Enough <:${itemSlug}:${item.icon}> **${item.name}**!`
          ),
        ],
      });
    }

    inventory[itemSlug] == 0 ? null : (inventory[itemSlug] -= qty);

    if (inventory[itemSlug] == 0) {
      delete inventory[itemSlug];
    }

    await User.updateOne(
      {
        discordId: userData.discordId,
      },
      {
        inventory: {
          ...inventory,
        },
      }
    );

    let emitable = client?.custom?.economy?.events?.get(itemSlug);

    if (!emitable.onUse) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `${client.emoji.yeetWrongStanding} <:${itemSlug}:${item.icon}> ${item.name} Is Not an usable item!`
        )
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        });

      return interaction.reply({
        embeds: [embed],
      });
    }

    let embed = new EmbedBuilder()
      .setColor(client.colors.GREY)
      .setDescription(
        `${client.emoji.yeetRightStanding} You Used **${qty}x** <:${itemSlug}:${item.icon}> ${item.name}!`
      )
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });

    if (emitable?.onUse) {
      await emitable.onUse({
        item,
        user: {
          ...userData,
          discordUser: user,
        },
        inventory,
        channel: interaction.channel,
        client,
        qty,
      });
    }

    return;
  },
};
