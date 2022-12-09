const { EmbedBuilder } = require("discord.js");
const Item = require("../../schemas/Item");
const User = require("../../schemas/User");

class Economy {
  constructor() {}
  async handleNeedsItem({ itemSlug, user, interaction, client }) {
    let userData =
      (await User.findOne({ discordId: user.id })) ||
      (await new User({ discordId: user.id }).save());

    let item = client.custom.economy.items.get(itemSlug);

    const { inventory } = userData;

    if (inventory.hasOwnProperty(itemSlug)) {
      return false;
    }

    let embed = new EmbedBuilder()
      .setDescription(
        `${client.emoji.yeetWrongStanding} Bruh.. You Need A <:${item.slug}:${item.icon}> **${item.name}** For That!\n
        Use The \`/buy\` Command To Get That!`
      )
      .setColor("Red")
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      });

    await interaction.reply({
      embeds: [embed],
    });
    return true;
  }
}

module.exports = new Economy();
